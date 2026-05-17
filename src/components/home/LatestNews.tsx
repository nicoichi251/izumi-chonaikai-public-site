import Link from "next/link";
import { ChevronRight, Pin } from "lucide-react";
import type { WpNews, WpNewsCategoryTag } from "@/types/wordpress";

type Props = {
  news: WpNews[];
};

type CategoryBadge = { label: string; classes: string };

const CATEGORY_BADGE: Record<WpNewsCategoryTag, CategoryBadge> = {
  important: { label: "重要", classes: "bg-red-50 text-red-600 border-red-200" },
  event: { label: "行事", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  disaster: { label: "防災", classes: "bg-orange-50 text-orange-700 border-orange-200" },
  living: { label: "生活情報", classes: "bg-sky-50 text-sky-700 border-sky-200" },
  info: { label: "お知らせ", classes: "bg-stone-100 text-stone-600 border-stone-200" },
};

const DEFAULT_BADGE: CategoryBadge = {
  label: "お知らせ",
  classes: "bg-stone-100 text-stone-600 border-stone-200",
};

const resolveBadge = (tag: string | undefined): CategoryBadge => {
  if (!tag) return DEFAULT_BADGE;
  return CATEGORY_BADGE[tag as WpNewsCategoryTag] ?? DEFAULT_BADGE;
};

const formatPublishedAt = (raw: string | undefined, fallback: string): string => {
  const src = raw ?? fallback;
  const datePart = src.split(/[ T]/)[0];
  return datePart.replaceAll("-", ".");
};

const decodeBasicHtmlEntities = (input: string): string =>
  input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#039;/g, "'");

/**
 * 最新お知らせ × N件のカードリスト。
 * WpNews（WP REST API形）をそのまま受け取り、ピン留め優先＋公開日降順で
 * 表示する想定。詳細ページ /news/[id] は別Sprintで実装中。
 */
export function LatestNews({ news }: Props) {
  return (
    <section className="px-2" aria-label="最新のお知らせ">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-black text-stone-800 px-2">
          最新のお知らせ
        </h3>
        <Link
          href="/news"
          className="text-[10px] font-black text-primary uppercase tracking-widest px-2"
        >
          すべて見る
        </Link>
      </div>
      <ul className="space-y-3">
        {news.map((item) => {
          const title = decodeBasicHtmlEntities(item.title.rendered);
          const badge = resolveBadge(item.acf?.category_tag);
          const dateText = formatPublishedAt(item.acf?.published_at, item.date);
          const pinned = item.acf?.is_pinned === true;
          return (
            <li key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-card flex items-center gap-4 active:bg-stone-50 transition-colors"
              >
                {pinned ? (
                  <Pin
                    size={14}
                    aria-label="ピン留め"
                    className="text-amber-500 shrink-0"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="w-2 h-2 bg-primary rounded-full shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-800 text-sm truncate">
                    {title}
                  </h4>
                  <p className="mt-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-stone-500">
                    <span>{dateText}</span>
                    <span
                      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[8px] tracking-wider ${badge.classes}`}
                    >
                      {badge.label}
                    </span>
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  aria-hidden
                  className="text-stone-200 shrink-0"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
