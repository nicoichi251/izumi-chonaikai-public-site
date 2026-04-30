import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { DisasterAlert } from "@/components/home/DisasterAlert";
import { LatestNews } from "@/components/home/LatestNews";
import { PreviewCTA } from "@/components/home/PreviewCTA";
import { QuickNav } from "@/components/home/QuickNav";
import { mockDisasterAlerts, mockNews } from "@/lib/mockData";

export default function HomePage() {
  return (
    <AppShell>
      <Header />
      <main className="flex-1 overflow-y-auto p-4 space-y-8 pb-8">
        <HeroSection />
        <DisasterAlert alerts={mockDisasterAlerts} />
        <LatestNews news={mockNews} />
        <PreviewCTA />
        <QuickNav />
        <Footer />
      </main>
      <BottomNav />
    </AppShell>
  );
}
