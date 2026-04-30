import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 親ディレクトリの別 lockfile を誤検出させないため、ワークスペースルートを固定。
  turbopack: {
    root: path.resolve(__dirname),
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
