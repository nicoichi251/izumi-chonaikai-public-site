import { Rss } from "lucide-react";
import type { DisasterAlert as DisasterAlertItem } from "@/types";

type Props = {
  alerts: DisasterAlertItem[];
};

/**
 * 札幌市防災RSSのプレースホルダ表示。
 * Phase 2 で実 RSS を fetch する想定（Cloudflare Workers 経由）。
 */
export function DisasterAlert({ alerts }: Props) {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="札幌市 防災情報"
      className="bg-orange-50 border border-orange-100 rounded-[2.5rem] p-6 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4 text-orange-600">
        <Rss size={16} aria-hidden />
        <h3 className="font-black text-[10px] tracking-widest uppercase">
          札幌市 防災RSS
        </h3>
      </div>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex items-start gap-3">
            <span
              aria-hidden
              className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 animate-pulse shrink-0"
            />
            <p className="text-xs font-bold text-stone-700 leading-snug">
              {alert.message}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
