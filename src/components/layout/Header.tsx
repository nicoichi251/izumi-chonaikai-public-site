import Link from "next/link";
import { MessageCircle, Search, UserRound } from "lucide-react";
import { MEMBER_PAGE_URL } from "@/lib/site";

const NAV_ITEMS = [
  { href: "/news", label: "お知らせ" },
  { href: "/events", label: "行事" },
  { href: "/living", label: "生活情報" },
  { href: "/disaster", label: "防災" },
  { href: "/about", label: "町内会について" },
] as const;

/**
 * ヘッダー。
 * SP: ロゴ + LINE登録ボタン（ナビは BottomNav が担う）
 * PC: ロゴ + 横ナビ + LINE登録ボタン
 * LINE CTA は LINE 公式ブランド色で常時露出（主要導線）。
 */
export function Header() {
  return (
    <header className="sticky top-0 z-[70] bg-white border-b border-stone-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-lg font-black text-white"
          >
            泉
          </span>
          <span>
            <span className="block text-sm font-black leading-none text-stone-900">
              発寒泉町内会
            </span>
            <span className="mt-1 block text-xs font-bold leading-none text-stone-500">
              札幌市西区発寒
            </span>
          </span>
        </Link>

        {/* PC: インライン検索フォーム（ロゴ→ナビ→検索→CTAの順。orderで並びを制御） */}
        <form
          action="/search"
          method="get"
          role="search"
          className="hidden min-w-0 flex-1 justify-end lg:order-3 lg:flex lg:max-w-[200px]"
        >
          <label htmlFor="header-q" className="sr-only">サイト内検索</label>
          <div className="relative w-full">
            <Search
              size={14}
              aria-hidden
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500"
            />
            <input
              id="header-q"
              name="q"
              type="search"
              placeholder="検索"
              className="h-9 w-full rounded-md border border-stone-200 bg-stone-50 pl-8 pr-2.5 text-xs text-stone-800 placeholder:text-stone-500 focus:border-primary focus:bg-white focus:outline-none"
            />
          </div>
        </form>

        <nav aria-label="グローバルナビゲーション" className="hidden lg:order-2 lg:mr-auto lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-md px-3 py-2 text-sm font-bold text-stone-700 hover:bg-stone-100 hover:text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* SP: 検索ページへのリンク */}
        <Link
          href="/search"
          aria-label="サイト内検索"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone-200 text-stone-500 hover:text-primary lg:hidden"
        >
          <Search size={16} aria-hidden />
        </Link>

        {/* PC: 既存会員向けの会員ページ入口 */}
        <a
          href={MEMBER_PAGE_URL}
          className="hidden shrink-0 items-center gap-1.5 rounded-md border border-stone-300 px-3.5 py-2.5 text-xs font-black text-stone-700 transition-colors hover:border-primary hover:text-primary lg:order-4 lg:flex"
        >
          <UserRound size={14} aria-hidden />
          会員ページ
        </a>

        <Link
          href="/join"
          className="flex shrink-0 items-center gap-1.5 rounded-md bg-line px-3.5 py-2.5 text-white transition-colors hover:bg-line-dark active:bg-line-dark lg:order-5"
        >
          <MessageCircle size={15} aria-hidden />
          <span className="text-xs font-black">LINE会員登録</span>
        </Link>
      </div>
    </header>
  );
}
