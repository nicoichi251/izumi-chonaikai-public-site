import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { getEvents } from "@/lib/wp-api";
import { decodeHtmlEntities } from "@/lib/wp-format";
import type { WpEvent } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "行事予定",
  description:
    "発寒泉町内会の年間行事予定。新春もちつき大会・春の一斉清掃ほか、地域の皆様と交流できる場をご案内します。",
};

const MONTHS_JP = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const sortByEventDate = (items: WpEvent[]): WpEvent[] =>
  [...items].sort((a, b) => {
    const aDate = a.acf?.event_date ?? a.date;
    const bDate = b.acf?.event_date ?? b.date;
    return aDate.localeCompare(bDate);
  });

export default async function EventsPage() {
  const eventsRaw = await getEvents({ perPage: 100 });
  const sorted = sortByEventDate(eventsRaw);

  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "行事予定" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        行事予定
      </h1>

      <p className="text-xs text-stone-500 leading-relaxed">
        参加申込みは <Link href="/join" className="text-primary font-bold underline">LINE会員</Link> になってからお手続きいただけます。
      </p>

      {sorted.length === 0 ? (
        <p className="text-sm text-stone-500">現在予定されている行事はありません。</p>
      ) : (
        <ul className="space-y-3">
          {sorted.map((event) => {
            const title = decodeHtmlEntities(event.title.rendered);
            const rawDate = event.acf?.event_date ?? event.date.split(/[ T]/)[0];
            const [y, m, d] = rawDate.split("-").map(Number);
            const day = d ?? 0;
            const month = MONTHS_JP[(m ?? 1) - 1] ?? "";
            const year = y ?? new Date().getFullYear();
            const location = event.acf?.event_location;
            const canceled = event.acf?.is_canceled === true;
            return (
              <li key={event.id}>
                <Link
                  href={`/events/${event.id}`}
                  className={`bg-white p-6 rounded-[2.5rem] border border-stone-100 flex items-center gap-4 active:bg-stone-50 transition-colors shadow-card ${canceled ? "opacity-70" : ""}`}
                >
                  <div className="text-center pr-4 border-r border-stone-100 shrink-0">
                    <p className="text-3xl font-black text-primary font-mono leading-none">
                      {day}
                    </p>
                    <p className="text-[8px] font-black text-stone-300 uppercase tracking-widest mt-1">
                      {month} {year}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {canceled && (
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 uppercase tracking-widest">
                          中止
                        </span>
                      )}
                      <h2 className={`font-black text-lg leading-tight ${canceled ? "text-stone-500 line-through" : "text-stone-800"}`}>
                        {title}
                      </h2>
                    </div>
                    {location && (
                      <p className="text-[10px] text-stone-500 font-bold mt-1 flex items-center gap-1">
                        <MapPin size={10} aria-hidden /> {location}
                      </p>
                    )}
                  </div>
                  <ChevronRight size={18} aria-hidden className="text-stone-300 shrink-0" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </PageShell>
  );
}
