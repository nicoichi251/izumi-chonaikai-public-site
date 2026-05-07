# 発寒泉町内会 公開HP（izumi-chonaikai-public-site）

札幌市西区・発寒泉町内会の公式公開HPです。Next.js 16 + Tailwind CSS v4 + TypeScript で構築。

- **公開URL（先行）**: https://hassamu-izumi.vercel.app
- **独自ドメイン（後日）**: https://hassamu-izumi.jp（取得・差し替えは Phase 1 完了後）
- **リポジトリ**: https://github.com/nicoichi251/izumi-chonaikai-public-site
- 関連文書: `cc-quickstart-guide-v1.1.md` / `public-site-implementation-plan-v1.0.md`

## 🔒 公開ステータス

現在は noindex 設定により、検索エンジンへのインデックスをブロックしています。役員会承認後に解除予定。

サンプルデータ状態のまま検索結果に出ないよう、`src/app/layout.tsx` の `metadata.robots` で `index: false / follow: false / nocache: true` を、`src/app/robots.ts` で `User-agent: * / Disallow: /` を設定中。

**解除手順（役員会承認後）**:
1. `src/app/layout.tsx` の `robots` ブロックを `index: true / follow: true` へ
2. `src/app/robots.ts` を `allow: '/'` + `sitemap` 指定に戻す
3. この節を「公開中」表示に更新
4. Google Search Console に登録

## 技術スタック

| レイヤ | 採用 |
|---|---|
| フレームワーク | Next.js 16 (App Router, Turbopack) |
| 言語 | TypeScript (strict) |
| スタイリング | Tailwind CSS v4（CSSファースト `@theme`） |
| アイコン | lucide-react |
| フォント | Noto Sans JP（next/font/google で self-host） |
| ホスティング | Vercel（ニコイチアカウント・東京リージョン hnd1） |
| アクセス解析 | Vercel Analytics（Cookie 不要・無料枠） |
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

> **注意**: 絶対パスに日本語マルチバイト文字を含む場所（例 `~/Documents/Claude作業部屋/`）でこのプロジェクトを動かすと Turbopack が panic します。プロジェクトは ASCII パス（例 `~/Dev/izumi-chonaikai/public-site/`）に置いてください。

## ディレクトリ構成（抜粋）

```
public-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # ルートレイアウト + 全体メタデータ
│   │   ├── page.tsx                # トップページ
│   │   ├── globals.css             # Tailwind v4 @theme でデザイントークン
│   │   ├── sitemap.ts              # sitemap.xml 自動生成
│   │   ├── robots.ts               # robots.txt 自動生成
│   │   ├── icon.svg                # ファビコン（緑 #2D5A27 + 「泉」）
│   │   ├── opengraph-image.tsx     # OGP 画像 1200x630（@vercel/og）
│   │   ├── twitter-image.tsx       # Twitter Card 画像
│   │   ├── about/                  # 町内会について
│   │   ├── news/        [id]/      # お知らせ一覧 + 詳細（SSG）
│   │   ├── events/      [id]/      # 行事予定一覧 + 詳細（SSG）
│   │   ├── living/                 # 生活便利帳トップ
│   │   │   ├── trash/              # ゴミ収集カレンダー
│   │   │   ├── han-map/            # 街区マップ（HanMap use client）
│   │   │   └── faq/                # よくある質問（details/summary）
│   │   ├── disaster/               # 防災情報
│   │   ├── preview/                # 会員ページのプレビュー（差別化要素）
│   │   ├── join/                   # LINE登録案内
│   │   ├── privacy/, terms/        # プラポリ / 利用規約（準備中）
│   │   └── contact/                # お問い合わせ（mailto）
│   ├── components/
│   │   ├── layout/                 # AppShell / Header / BottomNav / Footer / Breadcrumb / PageShell
│   │   ├── home/                   # HeroSection / DisasterAlert / LatestNews / QuickNav / PreviewCTA
│   │   ├── living/                 # HanMap (use client)
│   │   └── preview/                # LineMessageMockup / MemberPageMockup
│   ├── lib/
│   │   ├── mockData.ts             # サンプルデータ（Phase 2 で実コンテンツへ差し替え）
│   │   ├── constants.ts            # 緊急連絡先 / 札幌市公式リンク / お問い合わせアドレス
│   │   └── og.tsx                  # OGP 共通生成ロジック
│   └── types/
│       └── index.ts                # ドメイン型
└── public/
    └── images/
```

全ルート 22 件（うち 5 件は `generateStaticParams` の SSG）。

## ヘッドレスWordPress連携（Phase 2 / Sprint 1）

公開HPはお知らせ・広報アーカイブ・FAQ・行事の4種を WordPress（`cms.hassamu-izumi.jp`）から取得する設計です。WP環境がまだ立ち上がっていない期間も開発が止まらないよう、**未設定時はモックデータにフォールバック**します。

### ファイル

| パス | 役割 |
|---|---|
| `src/types/wordpress.ts` | WP REST API 返却JSONの型（`WpPost` 基底 + 4種CPT） |
| `src/lib/wp-api.ts` | `getNews / getBroadcastArchive / getFaqs / getEvents`（fetch + ISR 60秒） |
| `src/lib/mockWpData.ts` | 各CPTの開発用モック（5件ずつ） |
| `.env.local.example` | 接続先・認証情報のテンプレート |

### 環境変数

`.env.local.example` をコピーして `.env.local` を作成してください。

| 変数 | 必須 | 説明 |
|---|---|---|
| `WP_API_BASE_URL` | 任意 | WP REST API のベースURL（例：`https://cms.hassamu-izumi.jp/wp-json/wp/v2`）。**未設定時はモックを返します**。 |
| `WP_API_USERNAME` | 任意 | Application Password のユーザー名。下書きプレビュー等を読む時のみ設定。 |
| `WP_API_APP_PASSWORD` | 任意 | Application Password の発行値。 |

### モード切替の挙動

```
WP_API_BASE_URL が空                 → src/lib/mockWpData.ts を返す（fetchしない）
WP_API_BASE_URL 設定 + 200            → JSONをそのまま返す
WP_API_BASE_URL 設定 + 404            → [] を返す
WP_API_BASE_URL 設定 + 5xx / timeout  → WpApiError を throw（ビルド・SSR を意図的に失敗させる）
```

タイムアウトは 8 秒、ISR は 60 秒固定（`REVALIDATE_SECONDS`）。本番設定下で空配列を出さない方針なので、CMSダウン時は呼び出し側で `try/catch` するか、ビルド時にエラーを表面化させてください。

### Local WP との接続（Sprint 1で予定）

Local by Flywheel 等で `hassamu-izumi-cms.local` を立てた場合：

```bash
# .env.local
WP_API_BASE_URL=http://hassamu-izumi-cms.local/wp-json/wp/v2
```

WPには下記のCPTを登録する想定（詳細スキーマは v2.1 章4）：

- `news`（お知らせ・ACF: category, summary, pinned）
- `broadcast_archive`（広報アーカイブ・ACF: issue_date, pdf_url, …）
- `faq`（よくある質問・ACF: category, sort_order）
- `event`（行事・ACF: event_date, location, capacity, registration_url）

> 既存ページ（`/news`, `/events`, `/living/faq` 等）は当面 `src/lib/mockData.ts` のドメイン型を使い続けます。WP→ドメイン型の変換層は Sprint 2 で導入予定。

## デプロイ（Vercel）

### 初回デプロイ手順

1. リポジトリを Vercel にインポート（GitHub 連携 or `vercel` CLI）
2. プロジェクト設定:
   - 名前: `izumi-chonaikai-public-site`
   - フレームワーク: Next.js（自動検出）
   - リージョン: 東京 (hnd1)
3. Domains で `hassamu-izumi.vercel.app` を追加（無料サブドメイン・早い者勝ち）
4. 環境変数 `NEXT_PUBLIC_SITE_URL=https://hassamu-izumi.vercel.app` を設定
5. Vercel Analytics を有効化（プロジェクト → Analytics → Enable）

### 独自ドメイン取得後の切り替え（後日実施）

1. ムームードメイン等で `hassamu-izumi.jp` を取得
2. Cloudflare にサイト追加 → ネームサーバー変更
3. Vercel Settings → Domains に `hassamu-izumi.jp` を追加
4. Cloudflare DNS:
   - A レコード `@ → 76.76.21.21`
   - CNAME `www → cname.vercel-dns.com`
   - プロキシは「DNS のみ」（グレーの雲）
5. Vercel 環境変数 `NEXT_PUBLIC_SITE_URL` を `https://hassamu-izumi.jp` に変更
6. `next.config.ts` のリダイレクト設定（コメントアウト済み）を有効化してコミット
7. SSL 証明書発行待ち（Vercel 自動・通常数分）
8. Google Search Console に正式登録

## デザイントークン

`src/app/globals.css` の `@theme` 内で定義。詳細は `public-site-implementation-plan-v1.0.md` 第5章を参照。

- カラー: `--color-primary` #2D5A27 / `--color-bg-app` / `--color-bg-pc` / alert 系
- フォント: `--font-sans`（Noto Sans JP）
- 角丸: `--radius-3xl` 〜 `--radius-6xl`
- 影: `--shadow-card` / `--shadow-lifted`

## SEO / メタデータ

- `src/app/sitemap.ts` で全 22 ルートを自動列挙（events/news は mockData から動的に展開）
- `src/app/robots.ts` で全クローラ allow + sitemap 参照
- `src/app/opengraph-image.tsx` `twitter-image.tsx` で 1200×630 の OGP 画像を `@vercel/og` 動的生成（Noto Sans JP は Google Fonts API の `text` パラメータで必要グリフのみ取得）
- `src/app/icon.svg` は緑 `#2D5A27` + 「泉」字の SVG ファビコン
- `keywords` を `layout.tsx` に集約（発寒泉町内会・札幌市西区・電子回覧板など）
- 各下層ページは `metadata` を個別に export（`title` テンプレートで自動末尾化）

## 進捗

- [x] **Day 1**: プロジェクト基盤
- [x] **Day 2-3**: トップページ実装（Hero / DisasterAlert / LatestNews / PreviewCTA / QuickNav）
- [x] **Day 4-5**: 主要ページ実装（about / events / living / disaster / contact / news）
- [x] **Day 6-7**: プレビュー機能 / LINE登録案内 / プラポリ / 利用規約
- [x] **Day 8-10**: SEO（sitemap / robots / OGP / favicon）+ Vercel Analytics + 公開

## Phase 2 への引き継ぎ

公開HP完成後、別リポジトリで以下を構築予定（このリポジトリは触らない）：

- `izumi-chonaikai-liff` — LINE LIFF 会員アプリ（回覧板・行事申込）
- `izumi-chonaikai-admin` — 役員ダッシュボード
- `izumi-chonaikai-gas` — Google Apps Script 基盤（14 シート）
- `izumi-chonaikai-workers` — Cloudflare Workers 中継

サンプルデータ（`src/lib/mockData.ts`）は Phase 2 の GAS 連携で実データに差し替え予定。型定義（`src/types/index.ts`）はそのまま流用できる設計。
