import Link from "next/link";
import { BookOpen, ShieldAlert, UtensilsCrossed } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: typeof ShieldAlert;
};

const ITEMS: NavItem[] = [
  {
    href: "/disaster",
    label: "防災・安全",
    description: "避難所・緊急連絡先",
    icon: ShieldAlert,
  },
  {
    href: "/living",
    label: "生活情報",
    description: "ゴミ収集・班の地図・FAQ",
    icon: UtensilsCrossed,
  },
  {
    href: "/about",
    label: "町内会について",
    description: "活動内容・役員体制",
    icon: BookOpen,
  },
];

/**
 * 主要セクションへのクイックナビ。罫線カードの縦リスト。
 */
export function QuickNav() {
  return (
    <section className="space-y-2" aria-label="主要メニュー">
      <h3 className="text-sm font-black text-stone-900">くらしの情報</h3>
      <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
        {ITEMS.map(({ href, label, description, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-stone-50 active:bg-stone-50"
            >
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-primary"
              >
                <Icon size={17} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-black text-stone-800">{label}</span>
                <span className="mt-0.5 block text-[11px] text-stone-500">{description}</span>
              </span>
              <span aria-hidden className="text-stone-300">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
