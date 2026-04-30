import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { mockFaqs } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "よくある質問",
  description:
    "発寒泉町内会へのお問い合わせで多い質問と回答をまとめました。退会・引っ越し・LINE登録などについて。",
};

export default function FaqPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/living", label: "生活便利帳" },
          { label: "よくある質問" },
        ]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        よくある質問
      </h1>

      <ul className="space-y-3">
        {mockFaqs.map((faq) => (
          <li key={faq.id}>
            {/* details/summary を使うと JS 不要のアコーディオンになる */}
            <details className="group bg-white p-6 rounded-[2rem] border border-stone-100 shadow-card">
              <summary className="flex items-start justify-between gap-3 cursor-pointer list-none">
                <h3 className="font-black text-primary text-sm leading-tight flex-1">
                  Q. {faq.question}
                </h3>
                <ChevronDown
                  size={16}
                  aria-hidden
                  className="text-stone-300 shrink-0 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-4 text-xs text-stone-600 font-bold leading-relaxed">
                A. {faq.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
