import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/lib/constants";

type Props = {
  /**
   * - "hero": 大きめのカード（トップ・/join の主導線）
   * - "compact": 横長のコンパクト版（/preview の最後の押し戻し用）
   */
  variant?: "hero" | "compact";
  /** タイトル文を差替える場合 */
  title?: string;
  /** 説明文を差替える場合 */
  description?: string;
};

/**
 * 「LINE で会員登録」CTA。
 *
 * - 主導線：lin.ee の友だち追加 URL（外部・新規タブ）
 * - 副導線：/preview への「登録するとこんな画面」リンク
 *
 * 配色は brand（#2D5A27）統一。LINE 緑（#06C755）は使わない（CLAUDE 規約）。
 */
export function LineJoinCTA({
  variant = "hero",
  title = "LINEで会員登録",
  description = "回覧板・行事・除雪情報がスマホに届きます。所要時間は約 30 秒、いつでも退会できます。",
}: Props) {
  if (variant === "compact") {
    return (
      <section
        aria-label="LINE 会員登録"
        className="bg-primary rounded-[2.5rem] p-7 text-white shadow-lifted text-center space-y-4"
      >
        <h2 className="text-xl font-black leading-tight">{title}</h2>
        <p className="text-xs text-emerald-100/90 leading-relaxed">{description}</p>
        <a
          href={LINE_ADD_FRIEND_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-full font-black text-sm shadow-md active:scale-[0.99] transition-transform"
        >
          <MessageCircle size={16} aria-hidden />
          LINEで友だち追加して登録
          <ArrowRight size={14} aria-hidden />
        </a>
        <p>
          <Link
            href="/preview"
            className="text-[11px] font-bold text-emerald-100/90 underline underline-offset-2 hover:text-white"
          >
            登録するとこんな画面 →
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="LINE 会員登録"
      className="bg-primary rounded-[3rem] p-8 text-white shadow-lifted space-y-5"
    >
      <div className="flex items-center gap-2 text-emerald-200">
        <Sparkles size={16} aria-hidden />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Join via LINE
        </span>
      </div>
      <h2 className="text-2xl font-black leading-tight">{title}</h2>
      <p className="text-sm text-emerald-100/90 leading-relaxed">{description}</p>

      <a
        href={LINE_ADD_FRIEND_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white text-primary px-6 py-4 rounded-full font-black text-sm shadow-md active:scale-[0.99] transition-transform"
      >
        <MessageCircle size={18} aria-hidden />
        LINEで友だち追加して登録
        <ArrowRight size={16} aria-hidden />
      </a>

      <p className="text-[10px] text-emerald-100/80 font-bold">
        所要時間：約 30 秒・無料・任意
      </p>

      <div className="pt-2 border-t border-white/15">
        <Link
          href="/preview"
          className="inline-flex items-center gap-1 text-[12px] font-bold text-emerald-100 hover:text-white underline underline-offset-2"
        >
          登録するとこんな画面が見られます
          <ArrowRight size={12} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
