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

/**
 * 公開HP用のボトムナビ。
 * index.html の「ホーム/行事/防災/回覧/メニュー」を、
 * 公開HP向けに「ホーム / 行事 / 生活情報 / 防災 / お知らせ」へ再設計。
 */
const ITEMS: NavItem[] = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/events", label: "行事", icon: Calendar },
  { href: "/living", label: "生活情報", icon: UtensilsCrossed },
  { href: "/disaster", label: "防災", icon: ShieldAlert },
  { href: "/news", label: "お知らせ", icon: Bell },
];

export function BottomNav() {
  return (
    <nav
      aria-label="メインナビゲーション"
      className="shrink-0 pb-8 px-6 bg-white/95 backdrop-blur-xl border-t border-stone-50"
    >
      <ul className="p-2 flex justify-between items-center">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <li key={href} className="flex-1">
            <Link
              href={href}
              className="flex flex-col items-center gap-1.5 py-2 text-stone-500 hover:text-primary transition-colors"
            >
              <Icon size={22} aria-hidden />
              <span className="text-[8px] font-black uppercase">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
