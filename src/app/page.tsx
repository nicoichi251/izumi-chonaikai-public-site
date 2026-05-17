import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { DisasterAlert } from "@/components/home/DisasterAlert";
import { LatestNews } from "@/components/home/LatestNews";
import { PreviewCTA } from "@/components/home/PreviewCTA";
import { QuickNav } from "@/components/home/QuickNav";
import { getNews } from "@/lib/wp-api";
import { mockDisasterAlerts } from "@/lib/mockData";
import type { WpNews } from "@/types/wordpress";

const HOME_NEWS_LIMIT = 5;

const sortByPinAndDate = (items: WpNews[]): WpNews[] =>
  [...items].sort((a, b) => {
    const pinDiff =
      (b.acf?.is_pinned ? 1 : 0) - (a.acf?.is_pinned ? 1 : 0);
    if (pinDiff !== 0) return pinDiff;
    const aDate = a.acf?.published_at ?? a.date;
    const bDate = b.acf?.published_at ?? b.date;
    return bDate.localeCompare(aDate);
  });

export default async function HomePage() {
  const newsRaw = await getNews({ perPage: HOME_NEWS_LIMIT });
  const news = sortByPinAndDate(newsRaw).slice(0, HOME_NEWS_LIMIT);

  return (
    <AppShell>
      <Header />
      <main className="flex-1 overflow-y-auto p-4 space-y-8 pb-8">
        <HeroSection />
        <DisasterAlert alerts={mockDisasterAlerts} />
        <LatestNews news={news} />
        <PreviewCTA />
        <QuickNav />
        <Footer />
      </main>
      <BottomNav />
    </AppShell>
  );
}
