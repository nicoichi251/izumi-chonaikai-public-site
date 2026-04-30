import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
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
  "札幌市西区発寒の発寒泉町内会公式サイト。地域の行事予定・防災情報・生活便利帳をお届けします。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName,
    title: siteName,
    description,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
