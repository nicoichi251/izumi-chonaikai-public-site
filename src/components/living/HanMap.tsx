"use client";

import { useState } from "react";
import type { HanInfo } from "@/types";

type Props = {
  hanData: HanInfo[];
};

/**
 * index.html の han-btn ロジックを React 化。
 * 12班ボタンクリックで詳細を表示する。
 * 個人情報（班長氏名）は表示しない方針のため、範囲とランドマークのみ。
 */
export function HanMap({ hanData }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = hanData.find((h) => h.id === selectedId);

  return (
    <div className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100 shadow-card">
      <div className="grid grid-cols-4 gap-2">
        {hanData.map((han) => {
          const active = han.id === selectedId;
          return (
            <button
              key={han.id}
              type="button"
              onClick={() => setSelectedId(han.id)}
              aria-pressed={active}
              aria-label={`${han.name} の詳細を表示`}
              className={`aspect-square rounded-xl font-black border flex items-center justify-center transition-all ${
                active
                  ? "bg-primary text-white border-primary scale-110"
                  : "bg-white text-stone-400 border-stone-100 hover:text-primary"
              }`}
            >
              {han.id}
            </button>
          );
        })}
      </div>
      <div className="mt-6 text-center" aria-live="polite">
        {selected ? (
          <div className="bg-white p-5 rounded-2xl text-left border border-orange-200">
            <h3 className="text-xl font-black text-primary mb-2">{selected.name}</h3>
            <dl className="space-y-2 text-sm leading-relaxed">
              <div className="flex gap-2">
                <dt className="text-stone-300 font-normal shrink-0 w-16">範囲</dt>
                <dd className="font-bold text-stone-800">{selected.range}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-stone-300 font-normal shrink-0 w-16">目印</dt>
                <dd className="font-bold text-stone-800">{selected.landmark}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <p className="py-6 text-orange-400 font-bold text-xs italic">
            番号を選んでください
          </p>
        )}
      </div>
    </div>
  );
}
