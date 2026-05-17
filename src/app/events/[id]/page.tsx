import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Building2,
  CalendarDays,
  ChevronLeft,
  Clock,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { getEventById } from "@/lib/wp-api";
import { decodeHtmlEntities, formatJpDate, formatJpTime, stripHtml } from "@/lib/wp-format";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(Number(id));
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
  const event = await getEventById(Number(id));
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
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-black text-center">
          この行事は中止になりました
        </div>
      )}

      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        {title}
      </h1>

      <article
        className="wp-content text-stone-600 leading-relaxed text-sm space-y-4"
        dangerouslySetInnerHTML={{ __html: event.content.rendered }}
      />

      <dl className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 space-y-4">
        {dateText && (
          <div className="flex items-start gap-3">
            <CalendarDays size={16} aria-hidden className="text-primary mt-0.5 shrink-0" />
            <div>
              <dt className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-0.5">
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
              <dt className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-0.5">
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
              <dt className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-0.5">
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
              <dt className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-0.5">
                主催
              </dt>
              <dd className="font-black text-primary">{organizer}</dd>
            </div>
          </div>
        )}
      </dl>

      {!isCanceled && signupUrl && (
        <a
          href={signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-primary text-white text-center py-4 rounded-2xl font-black text-sm shadow-xl active:scale-[0.99] transition-transform"
        >
          申込みフォームを開く
        </a>
      )}

      {!isCanceled && !signupUrl && (
        <Link
          href="/join"
          className="block bg-primary text-white text-center py-4 rounded-2xl font-black text-sm shadow-xl active:scale-[0.99] transition-transform"
        >
          <span className="inline-flex items-center gap-2">
            <MessageCircle size={16} aria-hidden />
            LINEで最新情報を受け取る
          </span>
        </Link>
      )}

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
