import Link from "next/link";
import { MessageCircle } from "lucide-react";

/**
 * ヘッダー：「泉」ロゴ・町内会名・Digital Hubラベル・LINE登録CTA。
 * Day 6-7 で公開HPの主要動線（LINE登録）を常時露出する CTA ボタンに刷新。
 * 検索/通知は未実装のため一旦撤去（将来 LIFF で実装）。
 */
export function Header() {
  return (
    <header className="shrink-0 px-6 py-6 bg-white/80 backdrop-blur-md z-[70] border-b border-stone-100">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden
            className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg"
          >
            泉
          </span>
          <span>
            <span className="block font-black text-sm text-stone-800 leading-none">
              発寒泉町内会
            </span>
            <span className="block text-[8px] font-bold text-stone-500 mt-1 uppercase tracking-widest">
              Digital Hub
            </span>
          </span>
        </Link>
        <Link
          href="/join"
          className="flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-full shadow-md active:scale-95 transition-transform"
        >
          <MessageCircle size={14} aria-hidden />
          <span className="text-[10px] font-black uppercase tracking-widest">
            LINE登録
          </span>
        </Link>
      </div>
    </header>
  );
}
