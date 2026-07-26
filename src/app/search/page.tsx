import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Search } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { searchArticles } from "@/lib/wp-api";
import { decodeHtmlEntities, stripHtml } from "@/lib/wp-format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "サイト内検索",
  description:
    "発寒泉町内会のお知らせ・行事をキーワードで検索できます。花火大会・盆踊りなど過去の記事も探せます。",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

/** 検索語の前後の文脈を切り出す（ヒット箇所が分かる抜粋） */
function makeSnippet(html: string, q: string, radius = 45): string {
  const text = stripHtml(html);
  const idx = text.indexOf(q);
  if (idx < 0) return text.slice(0, radius * 2);
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + q.length + radius);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 50);
  const { news, events } = query
    ? await searchArticles(query)
    : { news: [], events: [] };
  const total = news.length + events.length;

  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "検索" }]} />
      <h1 className="pt-2 text-2xl font-black leading-tight text-stone-900">
        サイト内検索
      </h1>

      <form action="/search" method="get" role="search" className="flex gap-2">
        <label htmlFor="q" className="sr-only">
          キーワード
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="例: 花火大会、盆踊り、ゴミ収集"
          className="h-11 flex-1 rounded-md border border-stone-300 bg-white px-3.5 text-sm text-stone-800 placeholder:text-stone-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-black text-white transition-colors hover:bg-primary-dark"
        >
          <Search size={15} aria-hidden />
          検索
        </button>
      </form>

      {query && (
        <p className="text-xs font-bold text-stone-500">
          「{query}」の検索結果: {total}件
        </p>
      )}

      {query && total === 0 && (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center text-sm text-stone-500">
          <p className="font-bold text-stone-700">見つかりませんでした</p>
          <p className="mt-1 text-xs">
            別のことば（例:「祭り」「除雪」）でお試しください。
          </p>
        </div>
      )}

      {news.length > 0 && (
        <section aria-label="お知らせの検索結果" className="space-y-2">
          <h2 className="border-l-4 border-primary pl-2.5 text-sm font-black text-stone-900">
            お知らせ（{news.length}）
          </h2>
          <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
            {news.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/news/${n.id}`}
                  className="block px-4 py-3.5 transition-colors hover:bg-stone-50"
                >
                  <p className="text-sm font-black leading-snug text-stone-800">
                    {decodeHtmlEntities(n.title.rendered)}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">
                    {makeSnippet(n.content.rendered, query)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {events.length > 0 && (
        <section aria-label="行事の検索結果" className="space-y-2">
          <h2 className="border-l-4 border-primary pl-2.5 text-sm font-black text-stone-900">
            行事（{events.length}）
          </h2>
          <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
            {events.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/events/${e.id}`}
                  className="block px-4 py-3.5 transition-colors hover:bg-stone-50"
                >
                  <p className="flex items-center gap-2 text-sm font-black leading-snug text-stone-800">
                    {decodeHtmlEntities(e.title.rendered)}
                  </p>
                  {e.acf?.event_date && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-bold text-stone-500">
                      <CalendarDays size={12} aria-hidden />
                      {e.acf.event_date}
                      {e.acf.event_location && ` ・ ${e.acf.event_location}`}
                    </p>
                  )}
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">
                    {makeSnippet(e.content.rendered, query)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
