import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * /preview への導線。本プロジェクトの差別化要素：
 * 「会員になるとどんな画面が見られるか」を公開HPで先に見せて登録動機を高める。
 */
export function PreviewCTA() {
  return (
    <section className="mx-2">
      <Link
        href="/preview"
        className="block bg-primary rounded-[3rem] p-8 shadow-lifted text-white active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center gap-2 mb-3 text-emerald-200">
          <Sparkles size={16} aria-hidden />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Members Preview
          </span>
        </div>
        <h3 className="text-2xl font-black leading-tight mb-4">
          会員ページの
          <br />
          中身を覗いてみる
        </h3>
        <p className="text-sm text-emerald-100/90 leading-relaxed mb-6">
          回覧板・行事申込・除雪情報など、LINE会員になるとどんな情報が届くのか、登録前にプレビューで確認できます。
        </p>
        <span className="inline-flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-full font-black text-xs shadow-md">
          プレビューを見る
          <ArrowRight size={14} aria-hidden />
        </span>
      </Link>
    </section>
  );
}
