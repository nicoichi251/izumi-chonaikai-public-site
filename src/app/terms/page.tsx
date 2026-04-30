import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "発寒泉町内会公式サイトおよび LINE 会員機能の利用規約。役員会承認後に正式版を公開予定です。",
};

export default function TermsPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "利用規約" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        利用規約
      </h1>

      <section className="bg-white rounded-[2rem] border border-stone-100 shadow-card p-8 text-center">
        <span
          aria-hidden
          className="w-12 h-12 bg-stone-50 text-stone-400 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <FileText size={20} />
        </span>
        <p className="font-black text-stone-700 text-base mb-2">準備中</p>
        <p className="text-xs text-stone-500 leading-relaxed">
          正式版は役員会承認後に公開予定です。
        </p>
      </section>

      <section className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6 space-y-3">
        <p className="text-xs text-stone-700 leading-relaxed">
          公開までの間、本サイトおよび LINE 会員機能の利用条件についてのお問い合わせは
          下記からお願いします。
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 text-xs font-black text-primary"
        >
          お問い合わせはこちら
          <ChevronRight size={12} aria-hidden />
        </Link>
      </section>
    </PageShell>
  );
}
