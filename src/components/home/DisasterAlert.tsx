import { Rss } from "lucide-react";

export type DisasterFeedItem = {
  title: string;
  link: string | null;
  pub_date: string | null;
};

/**
 * 札幌市等の防災RSS（workersプロキシ経由）。
 * フィード未設定・取得失敗・0件ならセクションごと出さない。
 */
export function DisasterAlert({ items }: { items: DisasterFeedItem[] }) {
  if (items.length === 0) return null;

  return (
    <section
      aria-label="防災情報"
      className="rounded-xl border border-alert-orange/50 bg-white p-5 shadow-card"
    >
      <div className="mb-3 flex items-center gap-2 text-orange-700">
        <Rss size={16} aria-hidden />
        <h3 className="text-sm font-black">防災情報</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-red-500" />
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold leading-snug text-stone-700 underline-offset-2 hover:text-primary hover:underline"
              >
                {item.title}
              </a>
            ) : (
              <p className="text-sm font-bold leading-snug text-stone-700">{item.title}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
