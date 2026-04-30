import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  href?: string; // 末尾（現在地）はリンクなし
  label: string;
};

type Props = {
  items: BreadcrumbItem[];
};

/**
 * パンくず。配列の末尾は「現在地」として href を省略する規約。
 */
export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="パンくずリスト" className="text-[10px] font-bold text-stone-400">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary uppercase tracking-widest"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={`uppercase tracking-widest ${
                    isLast ? "text-stone-700" : ""
                  }`}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight size={10} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
