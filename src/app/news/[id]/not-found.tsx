import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";

export default function NewsNotFound() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/news", label: "お知らせ" },
          { label: "記事が見つかりません" },
        ]}
      />
      <div className="bg-white border border-stone-100 rounded-[2rem] p-8 text-center space-y-4 shadow-card">
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
          404 — Not Found
        </p>
        <h1 className="text-xl font-black text-stone-800">
          お知らせ記事が見つかりませんでした
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          リンクが古いか、記事が削除された可能性があります。
        </p>
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          <ChevronLeft size={14} aria-hidden />
          お知らせ一覧へ戻る
        </Link>
      </div>
    </PageShell>
  );
}
