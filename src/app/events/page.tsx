import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { mockEvents } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "行事予定",
  description:
    "発寒泉町内会の年間行事予定。新春もちつき大会・春の一斉清掃ほか、地域の皆様と交流できる場をご案内します。",
};

const MONTHS_JP = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function EventsPage() {
  // 時系列（昇順）で並び替え。
  const sorted = [...mockEvents].sort((a, b) => a.date.localeCompare(b.date));

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

      <ul className="space-y-3">
        {sorted.map((event) => {
          const d = new Date(event.date);
          return (
            <li key={event.id}>
              <Link
                href={`/events/${event.id}`}
                className="bg-white p-6 rounded-[2.5rem] border border-stone-100 flex items-center gap-4 active:bg-stone-50 transition-colors shadow-card"
              >
                <div className="text-center pr-4 border-r border-stone-100 shrink-0">
                  <p className="text-3xl font-black text-primary font-mono leading-none">
                    {d.getDate()}
                  </p>
                  <p className="text-[8px] font-black text-stone-300 uppercase tracking-widest mt-1">
                    {MONTHS_JP[d.getMonth()]} {d.getFullYear()}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-black text-lg text-stone-800 leading-tight">
                    {event.title}
                  </h2>
                  <p className="text-[10px] text-stone-400 font-bold mt-2 flex items-center gap-1">
                    <MapPin size={10} aria-hidden /> {event.location}
                  </p>
                </div>
                <ChevronRight size={18} aria-hidden className="text-stone-300 shrink-0" />
              </Link>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
