import type {
  WpBroadcastArchive,
  WpEvent,
  WpFaq,
  WpNews,
} from "@/types/wordpress";
import {
  mockWpBroadcastArchive,
  mockWpEvents,
  mockWpFaqs,
  mockWpNews,
} from "./mockWpData";
import {
  dbGetEventById,
  dbGetEvents,
  dbGetNews,
  dbGetNewsById,
  dbSearchArticles,
} from "./articles-db";

/**
 * 記事・行事の取得層（旧: ヘッドレスWordPressクライアント）。
 *
 * Cloudflare移行に伴いWPを廃止し、データソースはD1に変更。
 * 関数名・返却型はWP時代のまま維持しているため、ページ側は無変更。
 *
 * フォールバック方針:
 *   - D1バインディングが無い（素の next build / Cloudflare外）→ モック
 *   - D1に公開記事が0件（コンテンツ未投入の移行期）→ モック
 *     admin から最初の記事が公開された時点で自動的にD1へ切り替わる。
 *   - 詳細取得は id の形で振り分け：数値 = モック時代のID / それ以外 = D1のUUID
 *
 * faq / broadcast_archive は現状モックのみ（D1テーブル未定義。必要になったら追加）。
 */

type CollectionParams = {
  perPage?: number;
  page?: number;
};

const sliceMock = <T>(items: T[], params: CollectionParams): T[] => {
  const perPage = params.perPage ?? 20;
  const page = params.page ?? 1;
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
};

const isNumericId = (id: string): boolean => /^\d+$/.test(id);

export async function getNews(params: CollectionParams = {}): Promise<WpNews[]> {
  const fromDb = await dbGetNews(params.perPage ?? 20);
  if (fromDb && fromDb.length > 0) return sliceMock(fromDb, { ...params, page: 1 });
  return sliceMock(mockWpNews, params);
}

/**
 * 単一お知らせ取得。存在しなければ null（呼び出し側で notFound() 想定）。
 */
export async function getNewsById(id: string): Promise<WpNews | null> {
  if (!id) return null;
  if (isNumericId(id)) {
    return mockWpNews.find((n) => String(n.id) === id) ?? null;
  }
  const fromDb = await dbGetNewsById(id);
  return fromDb === "no-db" ? null : fromDb;
}

export async function getEvents(params: CollectionParams = {}): Promise<WpEvent[]> {
  const fromDb = await dbGetEvents(params.perPage ?? 20);
  if (fromDb && fromDb.length > 0) return sliceMock(fromDb, { ...params, page: 1 });
  return sliceMock(mockWpEvents, params);
}

/**
 * 単一行事取得。getNewsById と同じ方針。
 */
export async function getEventById(id: string): Promise<WpEvent | null> {
  if (!id) return null;
  if (isNumericId(id)) {
    return mockWpEvents.find((e) => String(e.id) === id) ?? null;
  }
  const fromDb = await dbGetEventById(id);
  return fromDb === "no-db" ? null : fromDb;
}

export async function getBroadcastArchive(
  params: CollectionParams = {},
): Promise<WpBroadcastArchive[]> {
  return sliceMock(mockWpBroadcastArchive, params);
}

export async function getFaqs(params: CollectionParams = {}): Promise<WpFaq[]> {
  return sliceMock(mockWpFaqs, params);
}

export type ArticleSearchResults = {
  news: WpNews[];
  events: WpEvent[];
};

/**
 * 公開記事のキーワード検索。D1優先、D1が使えない環境ではモックを部分一致で検索。
 */
export async function searchArticles(query: string): Promise<ArticleSearchResults> {
  const q = query.trim();
  if (!q) return { news: [], events: [] };

  const fromDb = await dbSearchArticles(q);
  if (fromDb) return fromDb;

  const hit = (title: string, html: string): boolean =>
    title.includes(q) || html.replace(/<[^>]*>/g, "").includes(q);

  return {
    news: mockWpNews.filter((n) => hit(n.title.rendered, n.content.rendered)),
    events: mockWpEvents.filter((e) => hit(e.title.rendered, e.content.rendered)),
  };
}
