import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 親ディレクトリの別 lockfile を誤検出させないため、ワークスペースルートを固定。
  turbopack: {
    root: path.resolve(__dirname),
  },
  // ヒーロー画像で next/image が外部画像を最適化できるよう許可ホストを宣言。
  // 段階的に実写へ差し替える前提（Phase 1 はフリー素材で構築）。
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // 独自ドメイン取得後に有効化するリダイレクト（後日コメントアウト解除）：
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [{ type: 'host', value: 'hassamu-izumi.vercel.app' }],
  //       destination: 'https://hassamu-izumi.jp/:path*',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
