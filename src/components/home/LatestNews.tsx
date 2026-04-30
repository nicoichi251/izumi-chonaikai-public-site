import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { News } from "@/types";

type Props = {
  news: News[];
};

const formatDate = (iso: string): string => iso.replaceAll("-", ".");

/**
 * 最新お知らせ × N件のカードリスト。
 * 詳細ページ /news/[id] は Day 4-5 以降で実装するため、
 * 現状はリンクとしては機能するがフォールバックの notFound() を返す想定。
 */
export function LatestNews({ news }: Props) {
  return (
    <section className="px-2" aria-label="最新のお知らせ">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-black text-stone-800 px-2">
          最新のお知らせ
        </h3>
        <Link
          href="/news"
          className="text-[10px] font-black text-primary uppercase tracking-widest px-2"
        >
          すべて見る
        </Link>
      </div>
      <ul className="space-y-3">
        {news.map((item) => (
          <li key={item.id}>
            <Link
              href={`/news/${item.id}`}
              className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-card flex items-center gap-4 active:bg-stone-50 transition-colors"
            >
              <span
                aria-hidden
                className="w-2 h-2 bg-primary rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-stone-800 text-sm truncate">
                  {item.title}
                </h4>
                <p className="text-[9px] text-stone-400 mt-1 uppercase font-bold tracking-wider">
                  {formatDate(item.date)} — {item.category}
                </p>
              </div>
              <ChevronRight
                size={14}
                aria-hidden
                className="text-stone-200 shrink-0"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
