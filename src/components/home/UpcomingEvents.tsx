import Link from "next/link";
import { MapPin } from "lucide-react";
import type { WpEvent } from "@/types/wordpress";
import { decodeHtmlEntities } from "@/lib/wp-format";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function formatDate(raw: string): { md: string; wd: string } {
  const [y, m, d] = raw.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return { md: `${m}/${d}`, wd: WEEKDAYS[date.getDay()] ?? "" };
}

/**
 * トップの「これからの行事」。開催日の近い順。
 * お知らせと同じ罫線リストで、日付を左に大きく出すカレンダー風の行。
 */
export function UpcomingEvents({ events }: { events: WpEvent[] }) {
  return (
    <section aria-label="これからの行事" className="space-y-2">
      <div className="flex items-end justify-between">
        <h3 className="border-l-4 border-primary pl-2.5 text-base font-black text-stone-900 lg:text-lg">
          これからの行事
        </h3>
        <Link href="/events#schedule" className="text-sm font-bold text-primary hover:underline">
          年間スケジュール →
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-white px-4 py-6 text-center text-sm text-stone-600">
          予定されている行事はありません。年間の予定は
          <Link href="/events#schedule" className="mx-1 font-bold text-primary underline underline-offset-2">
            年間スケジュール
          </Link>
          をご覧ください。
        </p>
      ) : (
        <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
          {events.map((e) => {
            const raw = e.acf?.event_date ?? e.date.split(/[ T]/)[0];
            const { md, wd } = formatDate(raw);
            const location = e.acf?.event_location;
            return (
              <li key={e.id}>
                <Link
                  href={`/events/${e.id}`}
                  className="flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-stone-50 active:bg-stone-50"
                >
                  <span className="w-16 shrink-0 border-r border-stone-200 pr-3 text-center">
                    <span className="block font-mono text-base font-black leading-tight text-primary">
                      {md}
                    </span>
                    <span className={`block text-[11px] font-bold ${wd === "日" ? "text-accent-red" : wd === "土" ? "text-alert-blue" : "text-stone-500"}`}>
                      （{wd}）
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black leading-snug text-stone-900">
                      {decodeHtmlEntities(e.title.rendered)}
                    </span>
                    {location && (
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-stone-500">
                        <MapPin size={11} aria-hidden />
                        {location}
                      </span>
                    )}
                  </span>
                  <span aria-hidden className="shrink-0 text-stone-300">→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
