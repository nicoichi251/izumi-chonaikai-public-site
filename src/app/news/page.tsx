import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { mockNews } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "お知らせ",
  description:
    "発寒泉町内会からのお知らせ一覧。総会資料・行事のご案内・生活情報などを掲載しています。",
};

const formatDate = (iso: string): string => iso.replaceAll("-", ".");

const CATEGORY_BADGE: Record<string, string> = {
  お知らせ: "bg-emerald-100 text-primary",
  生活情報: "bg-blue-100 text-blue-600",
  行事: "bg-orange-100 text-orange-600",
  防災: "bg-red-100 text-red-600",
};

export default function NewsListPage() {
  // 新しいものが上に来るよう降順ソート
  const sorted = [...mockNews].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "お知らせ" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        お知らせ
      </h1>

      <ul className="space-y-3">
        {sorted.map((item) => (
          <li key={item.id}>
            <Link
              href={`/news/${item.id}`}
              className="block bg-white p-6 rounded-[2rem] border border-stone-100 shadow-card active:bg-stone-50 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span
                  className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${CATEGORY_BADGE[item.category]}`}
                >
                  {item.category}
                </span>
                <span className="text-[9px] font-bold text-stone-500 tracking-wider font-mono">
                  {formatDate(item.date)}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="font-black text-stone-800 text-sm leading-tight mb-1">
                    {item.title}
                  </h2>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  aria-hidden
                  className="text-stone-300 shrink-0 mt-1"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
