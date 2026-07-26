import { Camera } from "lucide-react";
import { MEMBER_PAGE_URL } from "@/lib/site";

/**
 * 記事に添付されたアルバム（LINE会員限定）への導線。
 * リンク先はLIFFのアルバムページ（該当アルバムを直接開く）。
 */
export function AlbumLink({ albumId }: { albumId?: string }) {
  if (!albumId) return null;
  return (
    <a
      href={`${MEMBER_PAGE_URL}/albums?album=${albumId}`}
      className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3.5 shadow-card transition-colors hover:border-primary/50 hover:bg-stone-50"
    >
      <span
        aria-hidden
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-primary"
      >
        <Camera size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-black text-stone-800">
          写真アルバムを見る
        </span>
        <span className="mt-0.5 block text-[11px] text-stone-500">
          LINE会員限定 ・ LINEアプリで開きます
        </span>
      </span>
      <span aria-hidden className="text-stone-300">→</span>
    </a>
  );
}
