import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { DisasterAlert } from "@/components/home/DisasterAlert";
import { DigitalFeatures } from "@/components/home/DigitalFeatures";
import { LatestNews } from "@/components/home/LatestNews";
import { LineJoinCard } from "@/components/home/LineJoinCard";
import { PreviewCTA } from "@/components/home/PreviewCTA";
import { QuickNav } from "@/components/home/QuickNav";
import { getNews } from "@/lib/wp-api";
import { mockDisasterAlerts } from "@/lib/mockData";
import type { WpNews } from "@/types/wordpress";

// D1の最新コンテンツを常に反映するため動的レンダリング（旧ISR 60sの置き換え）
export const dynamic = "force-dynamic";

const HOME_NEWS_LIMIT = 6;

const sortByPinAndDate = (items: WpNews[]): WpNews[] =>
  [...items].sort((a, b) => {
    const pinDiff =
      (b.acf?.is_pinned ? 1 : 0) - (a.acf?.is_pinned ? 1 : 0);
    if (pinDiff !== 0) return pinDiff;
    const aDate = a.acf?.published_at ?? a.date;
    const bDate = b.acf?.published_at ?? b.date;
    return bDate.localeCompare(aDate);
  });

/**
 * トップページ。
 * SP: 1カラム（ヒーロー→防災→お知らせ→LINE登録→クイックナビ→プレビュー）
 * PC: 2カラム。左=読み物（ヒーロー・お知らせ）、右=行動（LINE登録・ナビ・プレビュー）
 */
export default async function HomePage() {
  const newsRaw = await getNews({ perPage: HOME_NEWS_LIMIT });
  const news = sortByPinAndDate(newsRaw).slice(0, HOME_NEWS_LIMIT);

  return (
    <AppShell>
      <Header />
      <main className="mx-auto w-full max-w-[430px] flex-1 px-5 py-6 pb-28 lg:max-w-5xl lg:px-8 lg:py-10 lg:pb-16">
        <div className="space-y-6">
          <DisasterAlert alerts={mockDisasterAlerts} />
          <div className="space-y-6 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8 lg:space-y-0">
            <div className="space-y-6">
              <HeroSection />
              <LatestNews news={news} />
              <div className="lg:hidden">
                <LineJoinCard />
              </div>
              <QuickNav />
            </div>
            <aside className="space-y-6 lg:sticky lg:top-20">
              <div className="hidden lg:block">
                <LineJoinCard />
              </div>
              <PreviewCTA />
            </aside>
          </div>

          <DigitalFeatures />
        </div>
      </main>
      <Footer />
      <BottomNav />
    </AppShell>
  );
}
