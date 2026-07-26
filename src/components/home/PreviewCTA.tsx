import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * /preview への導線。差別化要素：
 * 「会員になるとどんな画面が見られるか」を登録前に見せて動機づける。
 */
export function PreviewCTA() {
  return (
    <section aria-label="会員ページのプレビュー">
      <Link
        href="/preview"
        className="block rounded-xl border border-primary/30 bg-primary p-6 text-white transition-opacity hover:opacity-95"
      >
        <p className="text-xs font-bold text-emerald-100/80">会員ページを先に見る</p>
        <h3 className="mt-1.5 text-lg font-black leading-snug">
          登録するとLINEに何が届く？
          <br />
          実際の画面でご覧いただけます
        </h3>
        <p className="mt-3 text-xs leading-relaxed text-emerald-50/90">
          回覧板・行事申込・除雪情報など、会員だけに届く情報のプレビュー版を公開中です。
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-xs font-black text-primary">
          プレビューを見る
          <ArrowRight size={13} aria-hidden />
        </span>
      </Link>
    </section>
  );
}
