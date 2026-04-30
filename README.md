# 発寒泉町内会 公開HP（izumi-chonaikai-public-site）

札幌市西区・発寒泉町内会の公式公開HPです。Next.js 16 + Tailwind CSS v4 + TypeScript で構築。

- 公開URL（先行）: https://hassamu-izumi.vercel.app
- 独自ドメイン（後日）: https://hassamu-izumi.jp
- リポジトリ: https://github.com/nicoichi251/izumi-chonaikai-public-site
- 関連文書: `cc-quickstart-guide-v1.1.md` / `public-site-implementation-plan-v1.0.md`

## 技術スタック

| レイヤ | 採用 |
|---|---|
| フレームワーク | Next.js 16 (App Router, Turbopack) |
| 言語 | TypeScript (strict) |
| スタイリング | Tailwind CSS v4（CSSファースト `@theme`） |
| アイコン | lucide-react |
| フォント | Noto Sans JP（next/font/google で self-host） |
| ホスティング | Vercel（ニコイチアカウント） |
| パッケージ管理 | pnpm |

> 計画書 v1.0 では「Next.js 15 + tailwind.config.ts」を想定していたが、最新の create-next-app が Next.js 16 + Tailwind v4 を生成するためそれに追従。Tailwind v4 ではトークンを `src/app/globals.css` 内の `@theme` に集約している。

## セットアップ

```bash
# 依存インストール
pnpm install

# 開発サーバ
pnpm dev
# → http://localhost:3000

# 型チェック / Lint / 本番ビルド
pnpm lint
pnpm build
pnpm start
```

Node.js 20+、pnpm 10+ が前提。pnpm が未インストールなら `brew install pnpm`。

## ディレクトリ構成（抜粋）

```
public-site/
├── src/
│   ├── app/                    # App Router 配下
│   │   ├── layout.tsx          # ルートレイアウト + メタデータ
│   │   ├── page.tsx            # トップ（Day 1 はプレースホルダ）
│   │   ├── globals.css         # Tailwind v4 @theme でデザイントークン
│   │   ├── about/ events/ living/ disaster/
│   │   ├── preview/ join/ privacy/ terms/ contact/
│   │   └── (sitemap.ts / robots.ts は Day 8-10 で追加)
│   ├── components/
│   │   ├── layout/             # AppShell / Header / BottomNav / Footer
│   │   ├── home/ events/ living/ preview/ ui/
│   ├── lib/                    # mockData / constants / utils（Day 2-3 〜）
│   └── types/                  # 型定義（Day 2-3 〜）
└── public/
    └── images/
```

## デプロイ（Vercel）

1. このリポジトリを Vercel にインポート（フレームワーク自動検出）。
2. プロジェクト名: `izumi-chonaikai-public-site` / リージョン: 東京 (hnd1)。
3. Domains で `hassamu-izumi.vercel.app` を確保。
4. 環境変数 `NEXT_PUBLIC_SITE_URL` に公開URLを設定（メタデータ用）。

### 独自ドメイン取得後の切り替え（後日）

1. ムームードメイン等で `hassamu-izumi.jp` を取得。
2. Cloudflare にサイト追加 → ネームサーバー変更。
3. Vercel Settings → Domains に `hassamu-izumi.jp` を追加。
4. Cloudflare DNS に A `@ → 76.76.21.21` / CNAME `www → cname.vercel-dns.com` を追加（プロキシは「DNSのみ」）。
5. Vercel 環境変数 `NEXT_PUBLIC_SITE_URL` を `https://hassamu-izumi.jp` に変更。
6. `next.config.ts` に Vercel サブドメインからのリダイレクトを追加。

## デザイントークン

`src/app/globals.css` の `@theme` 内で定義。主要なものは以下。詳細は `public-site-implementation-plan-v1.0.md` 第5章を参照。

- カラー: `--color-primary` (#2D5A27) / `--color-bg-app` / `--color-bg-pc`
- フォント: `--font-sans`（Noto Sans JP）
- 角丸: `--radius-3xl` 〜 `--radius-6xl`
- 影: `--shadow-card` / `--shadow-lifted`

## 進捗

- [x] **Day 1**: プロジェクト基盤（このコミット）
- [ ] Day 2-3: トップページ実装
- [ ] Day 4-5: 主要ページ実装
- [ ] Day 6-7: プレビュー機能・LINE登録案内
- [ ] Day 8-10: SEO・公開準備
