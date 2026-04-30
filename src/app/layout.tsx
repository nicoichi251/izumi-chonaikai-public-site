import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Noto Sans JP（400/700/900）を next/font 経由で self-host
const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const siteName = "発寒泉町内会";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hassamu-izumi.vercel.app";
const description =
  "札幌市西区発寒の発寒泉町内会公式サイト。年間行事・防災情報・生活便利帳に加え、LINE会員になると届く回覧板や行事申込のプレビューもご覧いただけます。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  keywords: [
    "発寒泉町内会",
    "発寒",
    "発寒泉",
    "西区",
    "札幌市西区",
    "札幌市",
    "町内会",
    "電子回覧板",
    "回覧板",
    "防災",
    "ゴミ収集",
    "LINE町内会",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName,
    title: siteName,
    description,
    // og 画像は src/app/opengraph-image.tsx の file convention で自動生成。
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    // twitter 画像は src/app/twitter-image.tsx の file convention で自動生成。
  },
  // 役員会承認前のサンプルデータ状態のため検索エンジンへのインデックスをブロック。
  // 承認・正式公開時に index/follow=true へ戻す（README 公開ステータス節を参照）。
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
