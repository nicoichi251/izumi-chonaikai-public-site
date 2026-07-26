import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

type Props = {
  children: ReactNode;
};

/**
 * トップ以外の下層ページ共通シェル。
 * SP: 従来どおりの1カラム。PC: 読みやすい幅（max-w-3xl）に中央寄せ。
 * BottomNav（SPのみ・固定）のぶん下部に余白を確保する。
 */
export function PageShell({ children }: Props) {
  return (
    <AppShell>
      <Header />
      <main className="mx-auto w-full max-w-[430px] flex-1 space-y-6 px-5 py-6 pb-28 lg:max-w-3xl lg:px-8 lg:py-10 lg:pb-16">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </AppShell>
  );
}
