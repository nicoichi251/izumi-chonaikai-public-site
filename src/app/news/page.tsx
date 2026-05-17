import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Pin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { getNews } from "@/lib/wp-api";
import { decodeHtmlEntities, stripHtml } from "@/lib/wp-format";
import type { WpNews, WpNewsCategoryTag } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "お知らせ",
  description:
    "発寒泉町内会からのお知らせ一覧。総会資料・行事のご案内・生活情報などを掲載しています。",
};

const CATEGORY_BADGE: Record<WpNewsCategoryTag, { label: string; classes: string }> = {
  important: { label: "重要", classes: "bg-red-50 text-red-600" },
  event: { label: "行事", classes: "bg-emerald-50 text-emerald-700" },
  disaster: { label: "防災", classes: "bg-orange-50 text-orange-700" },
  living: { label: "生活情報", classes: "bg-sky-50 text-sky-700" },
  info: { label: "お知らせ", classes: "bg-stone-100 text-stone-600" },
};

const DEFAULT_BADGE = CATEGORY_BADGE.info;

const formatPublishedAt = (raw: string | undefined, fallback: string): string => {
  const src = raw ?? fallback;
  const datePart = src.split(/[ T]/)[0];
  return datePart.replaceAll("-", ".");
};

const sortByPinAndDate = (items: WpNews[]): WpNews[] =>
  [...items].sort((a, b) => {
    const pinDiff = (b.acf?.is_pinned ? 1 : 0) - (a.acf?.is_pinned ? 1 : 0);
    if (pinDiff !== 0) return pinDiff;
    const aDate = a.acf?.published_at ?? a.date;
    const bDate = b.acf?.published_at ?? b.date;
    return bDate.localeCompare(aDate);
  });

export default async function NewsListPage() {
  const newsRaw = await getNews({ perPage: 100 });
  const sorted = sortByPinAndDate(newsRaw);

  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "お知らせ" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        お知らせ
      </h1>

      {sorted.length === 0 ? (
        <p className="text-sm text-stone-500">現在お知らせはありません。</p>
      ) : (
        <ul className="space-y-3">
          {sorted.map((item) => {
            const title = decodeHtmlEntities(item.title.rendered);
            const summary = stripHtml(item.excerpt.rendered);
            const tag = item.acf?.category_tag as WpNewsCategoryTag | undefined;
            const badge = (tag && CATEGORY_BADGE[tag]) ?? DEFAULT_BADGE;
            const dateText = formatPublishedAt(item.acf?.published_at, item.date);
            const pinned = item.acf?.is_pinned === true;
            return (
              <li key={item.id}>
                <Link
                  href={`/news/${item.id}`}
                  className="block bg-white p-6 rounded-[2rem] border border-stone-100 shadow-card active:bg-stone-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {pinned && (
                        <Pin
                          size={12}
                          aria-label="ピン留め"
                          className="text-amber-500 shrink-0"
                        />
                      )}
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${badge.classes}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-stone-500 tracking-wider font-mono">
                      {dateText}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-black text-stone-800 text-sm leading-tight mb-1">
                        {title}
                      </h2>
                      {summary && (
                        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                          {summary}
                        </p>
                      )}
                    </div>
                    <ChevronRight
                      size={16}
                      aria-hidden
                      className="text-stone-300 shrink-0 mt-1"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </PageShell>
  );
}
