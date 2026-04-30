import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { mockEvents } from "@/lib/mockData";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return mockEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id);
  if (!event) return { title: "行事が見つかりません" };
  return {
    title: event.title,
    description: event.description,
  };
}

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
};

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id);
  if (!event) notFound();

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/events", label: "行事予定" },
          { label: event.title },
        ]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        {event.title}
      </h1>

      {event.image && (
        <div className="relative w-full h-56 rounded-[3rem] overflow-hidden shadow-xl">
          <Image
            src={event.image}
            alt={`${event.title}のイメージ`}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover"
          />
        </div>
      )}

      <p className="text-stone-600 leading-relaxed text-sm">
        {event.description}
      </p>

      <dl className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100 space-y-4">
        <div className="flex items-start gap-3">
          <CalendarDays size={16} aria-hidden className="text-primary mt-0.5 shrink-0" />
          <div>
            <dt className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-0.5">
              日時
            </dt>
            <dd className="font-black text-primary">{formatDate(event.date)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin size={16} aria-hidden className="text-primary mt-0.5 shrink-0" />
          <div>
            <dt className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-0.5">
              場所
            </dt>
            <dd className="font-black text-primary">{event.location}</dd>
          </div>
        </div>
      </dl>

      <Link
        href="/join"
        className="block bg-primary text-white text-center py-4 rounded-2xl font-black text-sm shadow-xl active:scale-[0.99] transition-transform"
      >
        <span className="inline-flex items-center gap-2">
          <MessageCircle size={16} aria-hidden />
          LINEで申込みする
        </span>
      </Link>
      <p className="text-[10px] text-stone-400 text-center">
        申込みには LINE 会員登録が必要です。所要時間は約 30 秒です。
      </p>
    </PageShell>
  );
}
