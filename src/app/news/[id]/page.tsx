import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { LineJoinCard } from "@/components/home/LineJoinCard";
import { BookLink } from "@/components/articles/BookLink";
import { AlbumLink } from "@/components/articles/AlbumLink";
import { getNewsById } from "@/lib/wp-api";
import { decodeHtmlEntities, formatJpDate, stripHtml } from "@/lib/wp-format";
import type { WpNewsCategoryTag } from "@/types/wordpress";

// D1の最新コンテンツを常に反映するため動的レンダリング（旧ISR 60sの置き換え）
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

const CATEGORY_BADGE: Record<WpNewsCategoryTag, { label: string; classes: string }> = {
  important: { label: "重要", classes: "border-accent-red text-accent-red" },
  event: { label: "行事", classes: "border-primary text-primary" },
  disaster: { label: "防災", classes: "border-alert-orange text-alert-orange" },
  living: { label: "生活情報", classes: "border-alert-blue text-alert-blue" },
  info: { label: "お知らせ", classes: "border-stone-300 text-stone-500" },
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
  const news = await getNewsById(id);
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
  const news = await getNewsById(id);
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

      {/* 記事ヘッダー + 本文：広報紙の記事のように1枚の枠にまとめる */}
      <article className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-card">
        <header className="border-b border-stone-200 bg-stone-50/60 px-5 py-4 lg:px-7">
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-black ${badge.classes}`}
            >
              {badge.label}
            </span>
            <time className="font-mono text-xs font-bold text-stone-500">{dateText}</time>
          </div>
          <h1 className="mt-2.5 text-xl font-black leading-snug text-stone-900 lg:text-2xl">
            {title}
          </h1>
        </header>
        <div
          className="article-body px-5 py-5 lg:px-7 lg:py-6"
          dangerouslySetInnerHTML={{ __html: news.content.rendered }}
        />
      </article>

      <BookLink url={news.acf?.book_url} />

      <AlbumLink albumId={news.acf?.album_id} />

      <LineJoinCard />

      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="mb-3 border-l-4 border-primary pl-2.5 text-xs font-black text-stone-900">
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
        </ul>
      </section>
    </PageShell>
  );
}
