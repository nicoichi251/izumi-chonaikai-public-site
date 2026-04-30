import { CalendarPlus, FileText, Users } from "lucide-react";

/**
 * 会員専用画面のモックアップ。
 *
 * スマホ枠を CSS で再現し、その内部に
 * 「回覧板リスト」「行事申込ボタン」「自班情報」のミニUIを描く。
 * 「これはイメージです」キャプションを必須で添える。
 *
 * 制約：実 LIFF 画面のスクショではなく、
 * このコンポーネントから描画したマークアップ。
 */
export function MemberPageMockup() {
  return (
    <figure
      role="img"
      aria-label="会員専用画面のイメージ。回覧板リスト・行事申込・自班情報を含むモバイル画面の見本"
      className="space-y-2"
    >
      {/* スマホ枠 */}
      <div className="mx-auto w-[280px] rounded-[2.5rem] border-[10px] border-stone-900 shadow-lifted overflow-hidden bg-bg-app">
        {/* 内部スクロールビュー風 */}
        <div className="p-4 space-y-3">
          {/* 自班情報カード（最上部） */}
          <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex items-center gap-2">
            <span
              aria-hidden
              className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center"
            >
              <Users size={14} />
            </span>
            <div>
              <p className="text-[8px] font-black text-primary uppercase tracking-widest">
                マイ班
              </p>
              <p className="text-[10px] font-black text-stone-800 leading-tight">
                4班 / 町内会館周辺
              </p>
            </div>
          </div>

          {/* 回覧板リスト */}
          <div className="space-y-2">
            <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest px-1">
              回覧板（最新）
            </p>
            {[
              { title: "除雪車の運行スケジュール", date: "2026.02.28", tag: "重要" },
              { title: "春の一斉清掃のご案内", date: "2026.02.20", tag: "行事" },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-stone-100 p-3 flex items-center gap-2"
              >
                <span
                  aria-hidden
                  className="w-7 h-7 bg-stone-50 rounded-lg flex items-center justify-center text-stone-500"
                >
                  <FileText size={12} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-stone-800 text-[10px] truncate">
                    {c.title}
                  </p>
                  <p className="text-[7px] font-bold text-stone-500 mt-0.5 tracking-widest font-mono">
                    {c.date} — {c.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 行事申込ボタン */}
          <div className="bg-white rounded-2xl border border-stone-100 p-3">
            <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest mb-2">
              次回の行事
            </p>
            <p className="font-black text-stone-800 text-[11px] mb-2">
              新春もちつき大会
            </p>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              className="w-full bg-primary text-white py-2 rounded-full font-black text-[9px] flex items-center justify-center gap-1"
            >
              <CalendarPlus size={10} />
              申込みする
            </button>
          </div>
        </div>
      </div>

      <figcaption className="text-center text-[10px] text-stone-500 font-bold">
        ※ これはイメージです
      </figcaption>
    </figure>
  );
}
