import Link from "next/link";
import { MessageCircle, ShieldAlert, UtensilsCrossed } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: typeof ShieldAlert;
  iconBg: string;
  iconColor: string;
};

const ITEMS: NavItem[] = [
  {
    href: "/disaster",
    label: "防災・安全",
    icon: ShieldAlert,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    href: "/living",
    label: "生活情報",
    icon: UtensilsCrossed,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

/**
 * 主要セクションへのクイックナビ。
 * 防災・生活情報を 2 列グリッドで配置し、LINE登録は下にフルワイドの強調CTAとして置く。
 */
export function QuickNav() {
  return (
    <section className="px-2 space-y-4" aria-label="主要メニュー">
      <div className="grid grid-cols-2 gap-4">
        {ITEMS.map(({ href, label, icon: Icon, iconBg, iconColor }) => (
          <Link
            key={href}
            href={href}
            className="bg-white p-6 rounded-[2.5rem] border border-stone-100 flex flex-col items-center gap-3 active:bg-stone-50 transition-colors shadow-card"
          >
            <span
              aria-hidden
              className={`w-12 h-12 ${iconBg} ${iconColor} rounded-2xl flex items-center justify-center shadow-sm`}
            >
              <Icon />
            </span>
            <span className="font-black text-[10px] text-stone-700 uppercase tracking-widest">
              {label}
            </span>
          </Link>
        ))}
      </div>
      <Link
        href="/join"
        className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 flex items-center gap-4 active:bg-emerald-100 transition-colors shadow-card"
      >
        <span
          aria-hidden
          className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center shadow-sm shrink-0"
        >
          <MessageCircle />
        </span>
        <div className="flex-1">
          <p className="font-black text-stone-800 text-sm leading-tight">
            LINEで登録する
          </p>
          <p className="text-[10px] font-bold text-stone-500 mt-1">
            お知らせと回覧板がスマホに届きます
          </p>
        </div>
        <span
          aria-hidden
          className="text-[10px] font-black text-primary uppercase tracking-widest"
        >
          無料
        </span>
      </Link>
    </section>
  );
}
