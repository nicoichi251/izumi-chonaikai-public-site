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
 * AppShell + Header + main + Footer + BottomNav を一箇所に集約。
 */
export function PageShell({ children }: Props) {
  return (
    <AppShell>
      <Header />
      <main className="flex-1 overflow-y-auto p-6 space-y-6 pb-8">
        {children}
        <Footer />
      </main>
      <BottomNav />
    </AppShell>
  );
}
