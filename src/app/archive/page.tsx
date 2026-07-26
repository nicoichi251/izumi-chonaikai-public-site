import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { dbGetArchives } from "@/lib/articles-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "広報アーカイブ",
  description:
    "発寒泉町内会の広報紙・回覧物のバックナンバー。紙面をそのままデジタルブックでご覧いただけます。",
};

export default async function ArchivePage() {
  const archives = await dbGetArchives();

  // 年ごとにグループ化
  const byYear = new Map<string, typeof archives>();
  for (const a of archives) {
    const year = a.issue_date.slice(0, 4);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(a);
  }

  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "広報アーカイブ" }]} />
      <h1 className="pt-2 text-2xl font-black leading-tight text-stone-900">広報アーカイブ</h1>
      <p className="text-sm leading-relaxed text-stone-600">
        広報紙や紙の回覧物を、紙面そのままのデジタルブックで公開しています。
        ページをめくる感覚でご覧ください。
      </p>

      {archives.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center text-sm text-stone-600">
          アーカイブは準備中です。公開までしばらくお待ちください。
        </p>
      ) : (
        Array.from(byYear.entries()).map(([year, items]) => (
          <section key={year} aria-label={`${year}年`} className="space-y-2">
            <h2 className="border-l-4 border-primary pl-2.5 text-base font-black text-stone-900">
              {year}年
            </h2>
            <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
              {items.map((a) => (
                <li key={a.id}>
                  <a
                    href={a.book_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-stone-50"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-stone-50 text-primary"
                    >
                      <BookOpen size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-stone-900">{a.title}</span>
                      <span className="mt-0.5 block font-mono text-xs text-stone-500">
                        {a.issue_date.replaceAll("-", ".")} 発行
                      </span>
                    </span>
                    <span aria-hidden className="text-stone-300">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </PageShell>
  );
}
