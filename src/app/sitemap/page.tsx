import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { MEMBER_PAGE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "サイトマップ",
  description: "発寒泉町内会サイトの全ページ一覧です。",
};

type Entry = { href: string; label: string; note?: string; external?: boolean };
type Group = { title: string; entries: Entry[] };

const GROUPS: Group[] = [
  {
    title: "お知らせ・行事",
    entries: [
      { href: "/news", label: "お知らせ一覧" },
      { href: "/events", label: "行事予定" },
      { href: "/archive", label: "広報アーカイブ", note: "広報紙のバックナンバー" },
      { href: "/search", label: "サイト内検索", note: "キーワードで過去の記事を探せます" },
    ],
  },
  {
    title: "くらしの情報",
    entries: [
      { href: "/living", label: "生活便利帳" },
      { href: "/living/trash", label: "ゴミ収集カレンダー" },
      { href: "/living/han-map", label: "班の地図" },
      { href: "/living/faq", label: "よくある質問" },
      { href: "/disaster", label: "防災情報", note: "避難所・緊急連絡先" },
    ],
  },
  {
    title: "LINE会員",
    entries: [
      { href: "/join", label: "LINEで登録する", note: "登録は約30秒・無料" },
      { href: "/preview", label: "会員ページプレビュー", note: "登録前に中身を見られます" },
      {
        href: MEMBER_PAGE_URL,
        label: "会員ページ（LINEで開く）",
        note: "回覧板・行事申込・写真アルバム",
        external: true,
      },
    ],
  },
  {
    title: "町内会について",
    entries: [
      { href: "/about", label: "町内会について", note: "活動内容・役員体制" },
      { href: "/contact", label: "お問い合わせ" },
      { href: "/privacy", label: "プライバシーポリシー" },
      { href: "/terms", label: "利用規約" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <PageShell>
      <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "サイトマップ" }]} />
      <h1 className="pt-2 text-2xl font-black leading-tight text-stone-900">サイトマップ</h1>
      <p className="text-sm leading-relaxed text-stone-600">
        このサイトの全ページの一覧です。お探しの情報が見つからないときは
        <Link href="/search" className="mx-1 font-bold text-primary underline underline-offset-2">
          サイト内検索
        </Link>
        もお試しください。
      </p>

      <div className="space-y-5">
        <section className="space-y-2">
          <h2 className="border-l-4 border-primary pl-2.5 text-base font-black text-stone-900">
            ホーム
          </h2>
          <ul className="overflow-hidden rounded-xl border border-stone-200 bg-white">
            <li>
              <Link href="/" className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-stone-800 transition-colors hover:bg-stone-50">
                トップページ
              </Link>
            </li>
          </ul>
        </section>

        {GROUPS.map((g) => (
          <section key={g.title} className="space-y-2">
            <h2 className="border-l-4 border-primary pl-2.5 text-base font-black text-stone-900">
              {g.title}
            </h2>
            <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
              {g.entries.map((e) => (
                <li key={e.href}>
                  {e.external ? (
                    <a
                      href={e.href}
                      className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-stone-50"
                    >
                      <span>
                        <span className="block text-sm font-bold text-stone-800">{e.label}</span>
                        {e.note && <span className="mt-0.5 block text-xs text-stone-500">{e.note}</span>}
                      </span>
                      <span aria-hidden className="shrink-0 text-stone-500">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={e.href}
                      className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-stone-50"
                    >
                      <span>
                        <span className="block text-sm font-bold text-stone-800">{e.label}</span>
                        {e.note && <span className="mt-0.5 block text-xs text-stone-500">{e.note}</span>}
                      </span>
                      <span aria-hidden className="shrink-0 text-stone-300">→</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
