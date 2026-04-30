import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { mockNews } from "@/lib/mockData";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return mockNews.map((news) => ({ id: news.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = mockNews.find((n) => n.id === id);
  if (!item) return { title: "お知らせが見つかりません" };
  return {
    title: item.title,
    description: item.summary,
  };
}

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
};

const CATEGORY_BADGE: Record<string, string> = {
  お知らせ: "bg-emerald-100 text-primary",
  生活情報: "bg-blue-100 text-blue-600",
  行事: "bg-orange-100 text-orange-600",
  防災: "bg-red-100 text-red-600",
};

const CATEGORY_RELATED_LINK: Record<string, { href: string; label: string }> = {
  お知らせ: { href: "/about", label: "町内会について" },
  生活情報: { href: "/living", label: "生活便利帳" },
  行事: { href: "/events", label: "行事予定" },
  防災: { href: "/disaster", label: "防災情報" },
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = mockNews.find((n) => n.id === id);
  if (!item) notFound();

  const related = CATEGORY_RELATED_LINK[item.category];
  const paragraphs = (item.body ?? item.summary).split("\n").filter((p) => p.trim() !== "");

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/news", label: "お知らせ" },
          { label: item.title },
        ]}
      />

      <div className="flex items-center gap-3 pt-2">
        <span
          className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${CATEGORY_BADGE[item.category]}`}
        >
          {item.category}
        </span>
        <span className="text-[10px] font-bold text-stone-400 tracking-wider font-mono">
          {formatDate(item.date)}
        </span>
      </div>

      <h1 className="text-2xl font-black text-stone-800 leading-tight">
        {item.title}
      </h1>

      <article className="space-y-4 text-sm text-stone-600 leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </article>

      <section className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6">
        <h2 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">
          関連リンク
        </h2>
        <ul className="space-y-2">
          {related && (
            <li>
              <Link
                href={related.href}
                className="text-sm font-bold text-stone-700 hover:text-primary"
              >
                → {related.label}
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/news"
              className="text-sm font-bold text-stone-700 hover:text-primary inline-flex items-center gap-1"
            >
              <ChevronLeft size={14} aria-hidden />
              お知らせ一覧へ戻る
            </Link>
          </li>
          <li>
            <Link
              href="/join"
              className="text-sm font-bold text-stone-700 hover:text-primary inline-flex items-center gap-1"
            >
              <MessageCircle size={14} aria-hidden />
              LINEで最新情報を受け取る
            </Link>
          </li>
        </ul>
      </section>
    </PageShell>
  );
}
