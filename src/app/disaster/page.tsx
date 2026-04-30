import type { Metadata } from "next";
import { ExternalLink, HeartPulse, MapPin, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { mockAeds, mockEvacuationSites } from "@/lib/mockData";
import { EMERGENCY_NUMBERS, SAPPORO_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "防災情報",
  description:
    "緊急連絡先、西区指定避難所、AED設置場所、札幌市ハザードマップへのリンクをまとめています。",
};

export default function DisasterPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "防災情報" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        防災情報
      </h1>

      <section className="bg-red-50 border border-red-100 rounded-[3rem] p-8 text-center shadow-card">
        <div
          aria-hidden
          className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-600 mx-auto mb-4 shadow-sm"
        >
          <Phone size={32} className="animate-pulse" />
        </div>
        <h2 className="font-black text-red-800 mb-6 text-sm">緊急時の連絡先</h2>
        <div className="space-y-3">
          <a
            href={`tel:${EMERGENCY_NUMBERS.fire}`}
            className="bg-white text-red-600 w-full py-4 rounded-2xl font-black text-xs shadow-sm flex justify-between px-8"
          >
            <span>消防・救急</span>
            <span>{EMERGENCY_NUMBERS.fire}</span>
          </a>
          <a
            href={`tel:${EMERGENCY_NUMBERS.police}`}
            className="bg-white text-red-600 w-full py-4 rounded-2xl font-black text-xs shadow-sm flex justify-between px-8"
          >
            <span>警察</span>
            <span>{EMERGENCY_NUMBERS.police}</span>
          </a>
        </div>
      </section>

      <section>
        <h2 className="font-black text-stone-800 text-base mb-3 flex items-center gap-2">
          <MapPin size={18} aria-hidden className="text-orange-600" />
          西区の指定避難所
        </h2>
        <ul className="space-y-3">
          {mockEvacuationSites.map((site) => (
            <li
              key={site.id}
              className="bg-white p-5 rounded-2xl border border-stone-100 shadow-card"
            >
              <p className="font-black text-stone-800 text-sm">{site.name}</p>
              <p className="text-[10px] font-bold text-orange-600 mt-1 uppercase tracking-widest">
                {site.type}
              </p>
              <p className="text-xs text-stone-500 mt-2">{site.address}</p>
            </li>
          ))}
        </ul>
        <p className="text-[10px] text-stone-400 mt-3 leading-relaxed">
          掲載情報はサンプルです。実際の指定避難所一覧は札幌市公式サイトをご確認ください。
        </p>
      </section>

      <section>
        <h2 className="font-black text-stone-800 text-base mb-3 flex items-center gap-2">
          <HeartPulse size={18} aria-hidden className="text-emerald-600" />
          AED設置場所
        </h2>
        <ul className="space-y-3">
          {mockAeds.map((aed) => (
            <li
              key={aed.id}
              className="bg-white p-5 rounded-2xl border border-stone-100 shadow-card flex justify-between items-center"
            >
              <span className="font-black text-stone-800 text-sm">{aed.name}</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                {aed.hours}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <a
        href={SAPPORO_LINKS.hazard_map}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-orange-50 border border-orange-100 rounded-[2rem] p-6 active:bg-orange-100 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black text-orange-800 text-sm">
              札幌市ハザードマップ
            </p>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
              洪水・土砂災害・地震被害想定マップが閲覧できます
            </p>
          </div>
          <ExternalLink size={18} aria-hidden className="text-orange-600 shrink-0 ml-4" />
        </div>
      </a>
    </PageShell>
  );
}
