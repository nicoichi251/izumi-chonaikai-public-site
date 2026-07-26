import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  CalendarDays,
  ChevronLeft,
  Clock,
  MapPin,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { LineJoinCard } from "@/components/home/LineJoinCard";
import { BookLink } from "@/components/articles/BookLink";
import { AlbumLink } from "@/components/articles/AlbumLink";
import { getEventById } from "@/lib/wp-api";
import { decodeHtmlEntities, formatJpDate, formatJpTime, stripHtml } from "@/lib/wp-format";

// D1の最新コンテンツを常に反映するため動的レンダリング（旧ISR 60sの置き換え）
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return { title: "行事が見つかりません" };
  const title = decodeHtmlEntities(event.title.rendered);
  const description = stripHtml(event.excerpt.rendered).slice(0, 120);
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

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const title = decodeHtmlEntities(event.title.rendered);
  const dateText = formatJpDate(event.acf?.event_date);
  const timeText = formatJpTime(event.acf?.event_time);
  const location = event.acf?.event_location;
  const organizer = event.acf?.event_organizer;
  const signupUrl = event.acf?.signup_url?.trim();
  const isCanceled = event.acf?.is_canceled === true;

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/events", label: "行事予定" },
          { label: title },
        ]}
      />

      {isCanceled && (
        <div className="rounded-md border-2 border-accent-red bg-white px-4 py-3 text-center text-sm font-black text-accent-red">
          この行事は中止になりました
        </div>
      )}

      {/* 行事ヘッダー + 開催情報 + 本文を1枚の枠にまとめる */}
      <article className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-card">
        <header className="border-b border-stone-200 bg-stone-50/60 px-5 py-4 lg:px-7">
          <h1 className="text-xl font-black leading-snug text-stone-900 lg:text-2xl">
            {title}
          </h1>
        </header>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border-b border-stone-200 px-5 py-4 sm:grid-cols-2 lg:px-7">
        {dateText && (
          <div className="flex items-start gap-3">
            <CalendarDays size={16} aria-hidden className="text-primary mt-0.5 shrink-0" />
            <div>
              <dt className="text-[10px] font-black text-stone-500 mb-0.5">
                開催日
              </dt>
              <dd className="font-black text-primary">{dateText}</dd>
            </div>
          </div>
        )}
        {timeText && (
          <div className="flex items-start gap-3">
            <Clock size={16} aria-hidden className="text-primary mt-0.5 shrink-0" />
            <div>
              <dt className="text-[10px] font-black text-stone-500 mb-0.5">
                開始時刻
              </dt>
              <dd className="font-black text-primary">{timeText}〜</dd>
            </div>
          </div>
        )}
        {location && (
          <div className="flex items-start gap-3">
            <MapPin size={16} aria-hidden className="text-primary mt-0.5 shrink-0" />
            <div>
              <dt className="text-[10px] font-black text-stone-500 mb-0.5">
                場所
              </dt>
              <dd className="font-black text-primary">{location}</dd>
            </div>
          </div>
        )}
        {organizer && (
          <div className="flex items-start gap-3">
            <Building2 size={16} aria-hidden className="text-primary mt-0.5 shrink-0" />
            <div>
              <dt className="text-[10px] font-black text-stone-500 mb-0.5">
                主催
              </dt>
              <dd className="font-black text-primary">{organizer}</dd>
            </div>
          </div>
        )}
        </dl>
        <div
          className="article-body px-5 py-5 lg:px-7 lg:py-6"
          dangerouslySetInnerHTML={{ __html: event.content.rendered }}
        />
      </article>

      <BookLink url={event.acf?.book_url} />

      <AlbumLink albumId={event.acf?.album_id} />

      {!isCanceled && signupUrl && (
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md bg-primary py-3.5 text-center text-sm font-black text-white transition-colors hover:bg-primary-dark"
        >
          申込みフォームを開く
        </a>
      )}

      {!isCanceled && !signupUrl && <LineJoinCard />}

      <Link
        href="/events"
        className="text-sm font-bold text-stone-700 hover:text-primary inline-flex items-center gap-1"
      >
        <ChevronLeft size={14} aria-hidden />
        行事予定一覧へ戻る
      </Link>
    </PageShell>
  );
}
