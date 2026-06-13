import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { MemberFormCta } from "@/components/wp/MemberFormCta";
import { getNewsById } from "@/lib/wp-api";
import { decodeHtmlEntities, formatJpDate, stripHtml } from "@/lib/wp-format";
import { shouldShowMemberCta } from "@/lib/wp-visibility";
import type { WpNewsCategoryTag } from "@/types/wordpress";

type Props = {
  params: Promise<{ id: string }>;
};

const CATEGORY_BADGE: Record<WpNewsCategoryTag, { label: string; classes: string }> = {
  important: { label: "重要", classes: "bg-red-50 text-red-600" },
  event: { label: "行事", classes: "bg-emerald-50 text-emerald-700" },
  disaster: { label: "防災", classes: "bg-orange-50 text-orange-700" },
  living: { label: "生活情報", classes: "bg-sky-50 text-sky-700" },
  info: { label: "お知らせ", classes: "bg-stone-100 text-stone-600" },
};

const DEFAULT_BADGE = CATEGORY_BADGE.info;

const CATEGORY_RELATED_LINK: Record<WpNewsCategoryTag, { href: string; label: string }> = {
  important: { href: "/about", label: "町内会について" },
  event: { href: "/events", label: "行事予定" },
  disaster: { href: "/disaster", label: "防災情報" },
  living: { href: "/living", label: "生活便利帳" },
  info: { href: "/about", label: "町内会について" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const news = await getNewsById(Number(id));
  if (!news) return { title: "記事が見つかりません" };
  const title = decodeHtmlEntities(news.title.rendered);
  const description = stripHtml(news.excerpt.rendered).slice(0, 120);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const news = await getNewsById(Number(id));
  if (!news) notFound();

  const title = decodeHtmlEntities(news.title.rendered);
  const tag = news.acf?.category_tag as WpNewsCategoryTag | undefined;
  const badge = (tag && CATEGORY_BADGE[tag]) ?? DEFAULT_BADGE;
  const related = (tag && CATEGORY_RELATED_LINK[tag]) ?? CATEGORY_RELATED_LINK.info;
  const dateText = formatJpDate(news.acf?.published_at ?? news.date);

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/news", label: "お知らせ" },
          { label: title },
        ]}
      />

      <div className="flex items-center gap-3 pt-2">
        <span
          className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${badge.classes}`}
        >
          {badge.label}
        </span>
        <span className="text-[10px] font-bold text-stone-500 tracking-wider font-mono">
          {dateText}
        </span>
      </div>

      <h1 className="text-2xl font-black text-stone-800 leading-tight">
        {title}
      </h1>

      <article
        className="wp-content space-y-4 text-sm text-stone-600 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: news.content.rendered }}
      />

      {shouldShowMemberCta(news) && (
        <MemberFormCta formType={news.acf?.form_type} />
      )}

      <section className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6">
        <h2 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">
          関連リンク
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href={related.href}
              className="text-sm font-bold text-stone-700 hover:text-primary"
            >
              → {related.label}
            </Link>
          </li>
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
