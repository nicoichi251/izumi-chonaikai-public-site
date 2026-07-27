import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { getEvents } from "@/lib/wp-api";
import { decodeHtmlEntities } from "@/lib/wp-format";
import type { WpEvent } from "@/types/wordpress";

// D1の最新コンテンツを常に反映するため動的レンダリング（旧ISR 60sの置き換え）
export const dynamic = "force-dynamic";

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

      {/* 年間スケジュール（月別の一覧表） */}
      <section id="schedule" aria-label="年間スケジュール" className="scroll-mt-20 space-y-2">
        <h2 className="border-l-4 border-primary pl-2.5 text-base font-black text-stone-900 lg:text-lg">
          年間スケジュール
        </h2>
        {sorted.length === 0 ? (
          <p className="rounded-xl border border-dashed border-stone-300 bg-white px-4 py-6 text-center text-sm text-stone-600">
            行事が登録されるとここに一覧表示されます。
          </p>
        ) : (
          <ScheduleTable events={sorted} />
        )}
        <p className="text-[11px] text-stone-500">
          日程は変更になる場合があります。最新情報は各行事のページとLINEでお知らせします。
        </p>
      </section>

      <h2 className="border-l-4 border-primary pl-2.5 pt-2 text-base font-black text-stone-900 lg:text-lg">
        行事のご案内
      </h2>

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
                  className={`bg-white p-6 rounded-xl border border-stone-100 flex items-center gap-4 active:bg-stone-50 transition-colors shadow-card ${canceled ? "opacity-70" : ""}`}
                >
                  <div className="text-center pr-4 border-r border-stone-100 shrink-0">
                    <p className="text-3xl font-black text-primary font-mono leading-none">
                      {day}
                    </p>
                    <p className="text-[11px] font-black text-stone-300 mt-1">
                      {month} {year}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {canceled && (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-sm border border-accent-red text-accent-red bg-white border border-red-200">
                          中止
                        </span>
                      )}
                      <h2 className={`font-black text-lg leading-tight ${canceled ? "text-stone-500 line-through" : "text-stone-800"}`}>
                        {title}
                      </h2>
                    </div>
                    {location && (
                      <p className="text-xs text-stone-500 font-bold mt-1 flex items-center gap-1">
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

const WEEKDAYS_JP = ["日", "月", "火", "水", "木", "金", "土"];

/** 年→月ごとにグループ化したコンパクトな年間表 */
function ScheduleTable({ events }: { events: WpEvent[] }) {
  const byYear = new Map<number, Map<number, WpEvent[]>>();
  for (const e of events) {
    const raw = e.acf?.event_date ?? e.date.split(/[ T]/)[0];
    const [y, m] = raw.split("-").map(Number);
    if (!y || !m) continue;
    if (!byYear.has(y)) byYear.set(y, new Map());
    const months = byYear.get(y)!;
    if (!months.has(m)) months.set(m, []);
    months.get(m)!.push(e);
  }

  return (
    <div className="space-y-4">
      {Array.from(byYear.entries()).map(([year, months]) => (
        <div key={year} className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <p className="border-b border-stone-200 bg-stone-50 px-4 py-2 text-sm font-black text-stone-800">
            {year}年
          </p>
          <ul className="divide-y divide-stone-100">
            {Array.from(months.entries()).map(([month, list]) =>
              list.map((e, i) => {
                const raw = e.acf?.event_date ?? e.date.split(/[ T]/)[0];
                const [, , d] = raw.split("-").map(Number);
                const wd = WEEKDAYS_JP[new Date(year, month - 1, d ?? 1).getDay()] ?? "";
                return (
                  <li key={e.id}>
                    <Link
                      href={`/events/${e.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-stone-50"
                    >
                      <span className="w-12 shrink-0 text-right font-mono text-sm font-black text-primary">
                        {i === 0 ? `${month}月` : ""}
                      </span>
                      <span className="w-16 shrink-0 font-mono text-xs font-bold text-stone-500">
                        {d}日（{wd}）
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-bold text-stone-800">
                        {decodeHtmlEntities(e.title.rendered)}
                      </span>
                      {e.acf?.is_canceled === true && (
                        <span className="shrink-0 border border-accent-red px-1.5 text-[11px] font-black text-accent-red">中止</span>
                      )}
                    </Link>
                  </li>
                );
              }),
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
