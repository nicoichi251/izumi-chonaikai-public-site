import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, HelpCircle, Navigation, Trash2 } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "生活便利帳",
  description:
    "ゴミ収集カレンダー、街区マップ、よくある質問など、発寒泉エリアの生活情報をまとめています。",
};

type LivingNav = {
  href: string;
  label: string;
  caption: string;
  icon: typeof Trash2;
  iconBg: string;
  iconColor: string;
};

const ITEMS: LivingNav[] = [
  {
    href: "/living/trash",
    label: "ゴミ収集日",
    caption: "Trash Schedule",
    icon: Trash2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    href: "/living/han-map",
    label: "街区・班分け",
    caption: "District Guide",
    icon: Navigation,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    href: "/living/faq",
    label: "よくある質問",
    caption: "FAQ",
    icon: HelpCircle,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export default function LivingPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "生活便利帳" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        生活便利帳
      </h1>
      <p className="text-xs text-stone-500 leading-relaxed">
        発寒泉エリアの生活に役立つ情報をまとめました。実際の運用情報は段階的に更新していきます。
      </p>

      <ul className="space-y-3">
        {ITEMS.map(({ href, label, caption, icon: Icon, iconBg, iconColor }) => (
          <li key={href}>
            <Link
              href={href}
              className="bg-white p-7 rounded-[2.5rem] border border-stone-100 shadow-card flex items-center gap-5 active:bg-stone-50 transition-colors"
            >
              <span
                aria-hidden
                className={`w-12 h-12 ${iconBg} ${iconColor} rounded-2xl flex items-center justify-center shadow-sm shrink-0`}
              >
                <Icon />
              </span>
              <span className="flex-1">
                <span className="block font-black text-stone-800 text-base leading-tight">
                  {label}
                </span>
                <span
                  className={`block text-[10px] font-bold tracking-widest uppercase mt-1 ${iconColor.replace("text-", "text-").replace("-600", "-300")}`}
                >
                  {caption}
                </span>
              </span>
              <ChevronRight size={18} aria-hidden className="text-stone-300 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
