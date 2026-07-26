import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { MEMBER_PAGE_URL } from "@/lib/site";

/**
 * フッター：LINE登録の再訴求 + 規約リンク + 著作権表記。
 * ページを読み終えた位置に最後の登録導線を置く。
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-5xl px-5 pt-8 pb-24 lg:px-8 lg:pb-8">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-stone-100 pb-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black text-stone-900">
              回覧板や行事の案内は、LINEで受け取れます
            </p>
            <p className="mt-1 text-xs text-stone-500">
              登録は約30秒・無料。班ごとのQRコードからどうぞ。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/join"
              className="inline-flex items-center gap-1.5 rounded-md bg-line px-4 py-2.5 text-xs font-black text-white transition-colors hover:bg-line-dark"
            >
              <MessageCircle size={14} aria-hidden />
              LINE会員登録はこちら
            </Link>
            <a
              href={MEMBER_PAGE_URL}
              className="inline-flex items-center rounded-md border border-stone-300 px-4 py-2.5 text-xs font-black text-stone-700 transition-colors hover:border-primary hover:text-primary"
            >
              会員の方はこちら
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 pt-6 text-[11px] text-stone-500 lg:flex-row lg:justify-between">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/about" className="hover:text-primary">町内会について</Link>
            <Link href="/privacy" className="hover:text-primary">プライバシーポリシー</Link>
            <Link href="/terms" className="hover:text-primary">利用規約</Link>
            <Link href="/contact" className="hover:text-primary">お問い合わせ</Link>
          </div>
          <p className="font-bold">© {year} 発寒泉町内会</p>
        </div>
      </div>
    </footer>
  );
}
