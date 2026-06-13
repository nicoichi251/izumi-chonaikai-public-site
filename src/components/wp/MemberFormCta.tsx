import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { memberCtaCopy } from "@/lib/wp-visibility";

type Props = {
  formType: string | undefined;
};

/**
 * `acf.show_form === true` の記事に表示する、会員ページ誘導 CTA。
 *
 * 公開HPでは申込/確認フォーム自体は描画せず、ここでは「会員ページから操作できる」
 * ことだけを伝える役割。実フォームは LIFF 側 (`acf.form_type` を解釈) で描画。
 */
export function MemberFormCta({ formType }: Props) {
  const { title, body } = memberCtaCopy(formType);
  return (
    <section
      className="rounded-[2rem] border border-primary/15 bg-emerald-50 px-6 py-5 space-y-3"
      aria-label="会員ページのご案内"
    >
      <div className="flex items-center gap-2">
        <Sparkles size={14} aria-hidden className="text-primary" />
        <p className="text-[10px] font-black text-primary uppercase tracking-widest">
          MEMBERS
        </p>
      </div>
      <h2 className="text-base font-black text-stone-800 leading-snug">
        {title}
      </h2>
      <p className="text-xs text-stone-600 leading-relaxed">{body}</p>
      <Link
        href="/join"
        className="inline-flex items-center gap-2 mt-1 rounded-2xl bg-primary text-white text-xs font-black px-4 py-2.5 shadow-card active:scale-[0.99] transition-transform"
      >
        <MessageCircle size={14} aria-hidden />
        LINE会員ページへ
      </Link>
    </section>
  );
}
