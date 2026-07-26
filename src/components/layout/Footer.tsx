import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { MEMBER_PAGE_URL } from "@/lib/site";

const SITE_LINKS = [
  { href: "/news", label: "お知らせ" },
  { href: "/events", label: "行事予定" },
  { href: "/living", label: "生活便利帳" },
  { href: "/disaster", label: "防災情報" },
  { href: "/archive", label: "広報アーカイブ" },
  { href: "/about", label: "町内会について" },
  { href: "/search", label: "サイト内検索" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/contact", label: "お問い合わせ" },
] as const;

/**
 * フッター。
 * SP: LINE再訴求 + 主要リンク。PC: 3カラムのサイトフッター。
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-5xl px-5 pt-10 pb-24 lg:px-8 lg:pb-10">
        <div className="grid gap-8 border-b border-stone-200 pb-8 lg:grid-cols-[1.2fr_1fr_1.2fr] lg:gap-10">
          {/* 町内会情報 */}
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-lg font-black text-white"
              >
                泉
              </span>
              <p className="text-base font-black text-stone-900">発寒泉町内会</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              札幌市西区発寒地区の町内会。
              紙のよさを残しながら、LINEを使った新しい運営に取り組んでいます。
            </p>
          </div>

          {/* サイトマップ */}
          <nav aria-label="フッターナビゲーション">
            <p className="text-sm font-black text-stone-900">メニュー</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {SITE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-stone-600 hover:text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* LINE導線 */}
          <div>
            <p className="text-sm font-black text-stone-900">
              回覧板や行事の案内はLINEで
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              登録は約30秒・無料。班ごとのQRコードからどうぞ。
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                href="/join"
                className="inline-flex items-center gap-1.5 rounded-md bg-line px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-line-dark"
              >
                <MessageCircle size={15} aria-hidden />
                LINE会員登録
              </Link>
              <a
                href={MEMBER_PAGE_URL}
                className="inline-flex items-center rounded-md border border-stone-300 px-4 py-2.5 text-sm font-black text-stone-700 transition-colors hover:border-primary hover:text-primary"
              >
                会員の方はこちら
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-6 text-xs text-stone-500 lg:flex-row lg:justify-between">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-primary">
                {label}
              </Link>
            ))}
          </div>
          <p className="font-bold">© {year} 発寒泉町内会</p>
        </div>
      </div>
    </footer>
  );
}
