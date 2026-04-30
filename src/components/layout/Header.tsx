import { Bell, Search } from "lucide-react";

/**
 * ヘッダー：「泉」ロゴ・町内会名・Digital Hubラベル・検索/通知ボタン。
 * index.html の app-header をReact化。
 */
export function Header() {
  return (
    <header className="shrink-0 px-6 py-6 bg-white/80 backdrop-blur-md z-[70] border-b border-stone-100">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
            泉
          </div>
          <div>
            <h1 className="font-black text-sm text-stone-800 leading-none">
              発寒泉町内会
            </h1>
            <p className="text-[8px] font-bold text-stone-400 mt-1 uppercase tracking-widest">
              Digital Hub
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="サイト内検索"
            className="w-9 h-9 bg-stone-50 rounded-full flex items-center justify-center text-stone-400"
          >
            <Search size={18} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="お知らせ"
            className="w-9 h-9 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 relative"
          >
            <Bell size={18} aria-hidden />
            <div
              className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"
              aria-hidden
            />
          </button>
        </div>
      </div>
    </header>
  );
}
