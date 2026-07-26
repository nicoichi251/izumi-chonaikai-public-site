import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { WpEvent, WpNews, WpNewsCategoryTag } from "@/types/wordpress";

/**
 * D1（izumi-chonaikai）から記事・行事を読むアクセス層。
 *
 * WP廃止後のデータソース。返却は既存の Wp* 型に整形するため、
 * ページコンポーネント側は WP 時代のまま変更不要。
 *
 * 出し分け（doc/cc-hp-visibility-filter-v1.md）:
 *   公開HPは visibility IN ('public','both') かつ published = 1 のみを
 *   SQL レベルでフィルタする。members 記事はレスポンス自体に乗らない
 *   （WP REST 時代の「APIを直接叩けば取れる」問題はここで構造的に解消）。
 */

type NewsRow = {
  id: string;
  title: string;
  body: string;
  category: string;
  visibility: string;
  published_at: string | null;
  book_url: string | null;
  created_at: string;
  updated_at: string;
};

type EventRow = {
  id: string;
  title: string;
  body: string;
  event_date: string;
  location: string | null;
  registration_enabled: number;
  visibility: string;
  book_url: string | null;
  created_at: string;
  updated_at: string;
};

/** D1 バインディング取得。Cloudflare コンテキスト外（素の next build 等）は null */
async function getDb(): Promise<D1Database | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env as { DB?: D1Database }).DB ?? null;
  } catch {
    return null;
  }
}

const escapeHtml = (s: string): string =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const stripTags = (html: string): string => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const makeExcerpt = (body: string): string => `<p>${escapeHtml(stripTags(body).slice(0, 120))}</p>`;

/** D1 の category → 表示用 category_tag（WP ACF 時代のスラッグ） */
const CATEGORY_TO_TAG: Record<string, WpNewsCategoryTag> = {
  announcement: "info",
  event_report: "event",
  important: "important",
  living: "living",
};

function newsRowToWp(row: NewsRow): WpNews {
  const date = row.published_at ?? row.created_at;
  return {
    id: row.id,
    date,
    date_gmt: date,
    modified: row.updated_at,
    modified_gmt: row.updated_at,
    slug: row.id,
    status: "publish",
    type: "news",
    link: `/news/${row.id}`,
    title: { rendered: escapeHtml(row.title) },
    content: { rendered: row.body },
    excerpt: { rendered: makeExcerpt(row.body) },
    featured_media: 0,
    acf: {
      published_at: date,
      category_tag: CATEGORY_TO_TAG[row.category] ?? "info",
      is_pinned: false,
      book_url: row.book_url ?? undefined,
    },
  };
}

function eventRowToWp(row: EventRow): WpEvent {
  return {
    id: row.id,
    date: row.created_at,
    date_gmt: row.created_at,
    modified: row.updated_at,
    modified_gmt: row.updated_at,
    slug: row.id,
    status: "publish",
    type: "events",
    link: `/events/${row.id}`,
    title: { rendered: escapeHtml(row.title) },
    content: { rendered: row.body },
    excerpt: { rendered: makeExcerpt(row.body) },
    featured_media: 0,
    acf: {
      event_date: row.event_date,
      event_location: row.location ?? undefined,
      is_canceled: false,
      book_url: row.book_url ?? undefined,
    },
  };
}

const PUBLIC_NEWS_WHERE = "published = 1 and visibility in ('public','both')";

export async function dbGetNews(limit: number): Promise<WpNews[] | null> {
  const db = await getDb();
  if (!db) return null;
  const { results } = await db
    .prepare(
      `select id, title, body, category, visibility, published_at, book_url, created_at, updated_at
       from news where ${PUBLIC_NEWS_WHERE}
       order by coalesce(published_at, created_at) desc limit ?1`,
    )
    .bind(limit)
    .all<NewsRow>();
  return results.map(newsRowToWp);
}

export async function dbGetNewsById(id: string): Promise<WpNews | null | "no-db"> {
  const db = await getDb();
  if (!db) return "no-db";
  const row = await db
    .prepare(
      `select id, title, body, category, visibility, published_at, book_url, created_at, updated_at
       from news where id = ?1 and ${PUBLIC_NEWS_WHERE} limit 1`,
    )
    .bind(id)
    .first<NewsRow>();
  return row ? newsRowToWp(row) : null;
}

export async function dbGetEvents(limit: number): Promise<WpEvent[] | null> {
  const db = await getDb();
  if (!db) return null;
  const { results } = await db
    .prepare(
      `select id, title, body, event_date, location, registration_enabled, visibility, book_url, created_at, updated_at
       from events where ${PUBLIC_NEWS_WHERE}
       order by event_date desc limit ?1`,
    )
    .bind(limit)
    .all<EventRow>();
  return results.map(eventRowToWp);
}

export async function dbGetEventById(id: string): Promise<WpEvent | null | "no-db"> {
  const db = await getDb();
  if (!db) return "no-db";
  const row = await db
    .prepare(
      `select id, title, body, event_date, location, registration_enabled, visibility, book_url, created_at, updated_at
       from events where id = ?1 and ${PUBLIC_NEWS_WHERE} limit 1`,
    )
    .bind(id)
    .first<EventRow>();
  return row ? eventRowToWp(row) : null;
}

/** LIKE 用エスケープ（% _ を無効化） */
const escapeLike = (s: string): string => s.replace(/[\\%_]/g, (c) => `\\${c}`);

export type SearchResults = {
  news: WpNews[];
  events: WpEvent[];
};

/**
 * 公開記事のキーワード検索（news + events 横断）。
 * タイトル・本文の部分一致。会員限定（members）記事は対象外。
 * 町内会の記事規模（〜数百件）では LIKE で十分高速。
 */
export async function dbSearchArticles(query: string, limit = 30): Promise<SearchResults | null> {
  const db = await getDb();
  if (!db) return null;
  const pattern = `%${escapeLike(query)}%`;

  const [newsRes, eventsRes] = await Promise.all([
    db
      .prepare(
        `select id, title, body, category, visibility, published_at, book_url, created_at, updated_at
         from news where ${PUBLIC_NEWS_WHERE}
           and (title like ?1 escape '\\' or body like ?1 escape '\\')
         order by coalesce(published_at, created_at) desc limit ?2`,
      )
      .bind(pattern, limit)
      .all<NewsRow>(),
    db
      .prepare(
        `select id, title, body, event_date, location, registration_enabled, visibility, book_url, created_at, updated_at
         from events where ${PUBLIC_NEWS_WHERE}
           and (title like ?1 escape '\\' or body like ?1 escape '\\')
         order by event_date desc limit ?2`,
      )
      .bind(pattern, limit)
      .all<EventRow>(),
  ]);

  return {
    news: newsRes.results.map(newsRowToWp),
    events: eventsRes.results.map(eventRowToWp),
  };
}
