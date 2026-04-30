import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <AppShell>
      <Header />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <section className="bg-white rounded-[2.5rem] p-8 shadow-card border border-stone-100">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">
            Day 1 Scaffolding
          </p>
          <h2 className="text-2xl font-black text-stone-800 leading-tight mb-4">
            Hello, 発寒泉町内会
          </h2>
          <p className="text-sm text-stone-500 leading-relaxed">
            水と緑の街・発寒泉のデジタル玄関口を準備中です。
            Day 2 以降でヒーロー・お知らせ・プレビュー機能を順次実装します。
          </p>
        </section>
        <section className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6">
          <h3 className="font-black text-primary text-sm mb-2">
            開発メモ
          </h3>
          <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
            <li>Tailwind v4（CSSファースト @theme）でデザイントークンを定義</li>
            <li>Noto Sans JP は next/font/google で self-host</li>
            <li>SPフィール（max-width 400px）をPC時もコンテナで再現</li>
          </ul>
        </section>
        <Footer />
      </main>
      <BottomNav />
    </AppShell>
  );
}
