import { BookOpen } from "lucide-react";

/**
 * NICO BOOK（デジタルブック）への導線。
 * 紙の回覧板・広報紙をスキャンしたブックを、記事から開けるようにする。
 */
export function BookLink({ url }: { url?: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3.5 shadow-card transition-colors hover:border-primary/50 hover:bg-stone-50"
    >
      <span
        aria-hidden
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-primary"
      >
        <BookOpen size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-stone-800">
          デジタルブックで読む
        </span>
        <span className="mt-0.5 block text-[11px] text-stone-500">
          紙面をそのまま、ページをめくって閲覧できます
        </span>
      </span>
      <span aria-hidden className="text-stone-300">→</span>
    </a>
  );
}
