import Link from "next/link";
import {
  Bell,
  Calendar,
  Home,
  ShieldAlert,
  UtensilsCrossed,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Home;
};

const ITEMS: NavItem[] = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/events", label: "行事", icon: Calendar },
  { href: "/living", label: "生活情報", icon: UtensilsCrossed },
  { href: "/disaster", label: "防災", icon: ShieldAlert },
  { href: "/news", label: "お知らせ", icon: Bell },
];

/**
 * SP専用のボトムナビ（画面下固定）。PCはヘッダーの横ナビを使うため非表示。
 */
export function BottomNav() {
  return (
    <nav
      aria-label="メインナビゲーション"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-stone-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-[430px] items-center justify-between px-4 py-1.5">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <li key={href} className="flex-1">
            <Link
              href={href}
              className="flex flex-col items-center gap-1 py-1.5 text-stone-500 hover:text-primary transition-colors"
            >
              <Icon size={21} aria-hidden />
              <span className="text-xs font-bold">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
