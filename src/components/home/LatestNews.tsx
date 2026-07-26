import Link from "next/link";
import { Pin } from "lucide-react";
import type { WpNews, WpNewsCategoryTag } from "@/types/wordpress";

type Props = {
  news: WpNews[];
};

type CategoryBadge = { label: string; classes: string };

const CATEGORY_BADGE: Record<WpNewsCategoryTag, CategoryBadge> = {
  important: { label: "重要", classes: "border-accent-red text-accent-red" },
  event: { label: "行事", classes: "border-primary text-primary" },
  disaster: { label: "防災", classes: "border-alert-orange text-alert-orange" },
  living: { label: "生活情報", classes: "border-alert-blue text-alert-blue" },
  info: { label: "お知らせ", classes: "border-stone-300 text-stone-500" },
};

const DEFAULT_BADGE: CategoryBadge = {
  label: "お知らせ",
  classes: "border-stone-300 text-stone-500",
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
 * 最新お知らせ。広報紙の「新着欄」風に、1枚の罫線カードに行で積む。
 */
export function LatestNews({ news }: Props) {
  return (
    <section aria-label="最新のお知らせ" className="space-y-2">
      <div className="flex items-end justify-between">
        <h3 className="border-l-4 border-primary pl-2.5 text-base font-black text-stone-900 lg:text-lg">最新のお知らせ</h3>
        <Link href="/news" className="text-sm font-bold text-primary hover:underline">
          一覧へ →
        </Link>
      </div>
      <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
        {news.map((item) => {
          const title = decodeBasicHtmlEntities(item.title.rendered);
          const badge = resolveBadge(item.acf?.category_tag);
          const dateText = formatPublishedAt(item.acf?.published_at, item.date);
          const pinned = item.acf?.is_pinned === true;
          return (
            <li key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-stone-50 active:bg-stone-50"
              >
                <span className="flex shrink-0 items-center gap-1.5 pt-0.5">
                  <time className="font-mono text-xs font-bold text-stone-500">
                    {dateText}
                  </time>
                  <span
                    className={`inline-flex items-center border px-1.5 py-px text-xs font-black ${badge.classes}`}
                  >
                    {badge.label}
                  </span>
                  {pinned && (
                    <Pin size={12} aria-label="ピン留め" className="text-accent-red" />
                  )}
                </span>
                <span className="min-w-0 flex-1 text-sm font-bold leading-snug text-stone-800">
                  {title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
