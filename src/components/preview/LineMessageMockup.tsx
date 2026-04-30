import { CheckCheck } from "lucide-react";

type Props = {
  body: string;
  time: string;
  /**
   * メッセージ末尾に「既読」風マークを表示するか（演出用）。
   */
  read?: boolean;
};

/**
 * LINE グループチャット風の吹き出しモックアップ。
 *
 * 制約：LINE 公式の意匠は直接コピーしない。
 * - 緑は LINE のライムグリーンではなくブランドの深緑（--color-primary）を採用
 * - 吹き出しは丸みを強めにし、ふかふかした親しみやすさを保つ
 * - アイコンは「泉」モノグラム（町内会ブランド）
 *
 * 送信者名は常に「発寒泉町内会」固定。
 */
export function LineMessageMockup({ body, time, read }: Props) {
  return (
    <article
      aria-label={`${time} のお知らせ通知例`}
      className="flex items-start gap-3"
    >
      <span
        aria-hidden
        className="w-9 h-9 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-base shadow-md shrink-0"
      >
        泉
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-black text-stone-500 mb-1">
          発寒泉町内会
        </p>
        <div className="bg-white rounded-tl-md rounded-tr-2xl rounded-br-2xl rounded-bl-2xl border border-stone-100 shadow-card p-4">
          <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
            {body}
          </p>
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-[9px] font-bold text-stone-400">
          {read && (
            <span className="inline-flex items-center gap-0.5 text-primary">
              <CheckCheck size={10} aria-hidden />
              既読
            </span>
          )}
          <span>{time}</span>
        </div>
      </div>
    </article>
  );
}
