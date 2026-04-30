import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { mockTrashSchedule } from "@/lib/mockData";
import { SAPPORO_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ゴミ収集カレンダー",
  description:
    "発寒泉エリアの曜日別ゴミ収集スケジュール。出し方の詳細は札幌市西区公式情報をご確認ください。",
};

export default function TrashPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/living", label: "生活便利帳" },
          { label: "ゴミ収集" },
        ]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        ゴミ収集カレンダー
      </h1>

      <ul className="space-y-3">
        {mockTrashSchedule.map((item) => (
          <li
            key={`${item.days}-${item.category}`}
            className="bg-white p-5 rounded-2xl border border-stone-100 flex justify-between items-center shadow-card"
          >
            <span className="font-black text-stone-800 text-sm">{item.days}</span>
            <span className={`font-bold text-sm ${item.colorClass}`}>
              {item.category}
            </span>
          </li>
        ))}
      </ul>

      <section className="bg-orange-50 border border-orange-100 rounded-[2rem] p-6">
        <p className="text-xs text-stone-700 leading-relaxed">
          ゴミの出し方・分別方法は札幌市公式情報を引用しています。
          詳細・最新情報は必ず札幌市公式サイトをご確認ください。
        </p>
        <a
          href={SAPPORO_LINKS.trash_west}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-xs font-black text-orange-600"
        >
          札幌市公式：ゴミの出し方
          <ExternalLink size={12} aria-hidden />
        </a>
      </section>
    </PageShell>
  );
}
