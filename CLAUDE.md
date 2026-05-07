@AGENTS.md

# CLAUDE.md — public-site（発寒泉町内会 公開HP）

このファイルはセッション開始時にCCが最初に読むプロジェクト規約集です。`@AGENTS.md` で Next.js 16 の注意事項を、本書でリポジトリ固有の規約を共有します。

## 1. プロジェクト概要

発寒泉町内会の**公開HP**。誰でもアクセスできる情報（お知らせ・行事・生活便利帳・防災・LINE登録案内）を配信。

- 本番URL（暫定）: `https://hassamu-izumi.vercel.app`
- 独自ドメイン（Sprint 1）: `https://hassamu-izumi.jp`
- ステータス: 22ルート稼働中・noindex継続（役員会承認待ち）

### 関連リポジトリ

| リポジトリ | 役割 | サブドメイン |
|---|---|---|
| `../public-site`（このリポ） | 公開HP（誰でもアクセス可） | `hassamu-izumi.jp` |
| `../admin` | 役員ダッシュボード（Supabase Auth） | `admin.hassamu-izumi.jp` |
| `../liff` | LINE LIFF会員アプリ（LINE Login） | `liff.hassamu-izumi.jp` |
| `../workers` | Cloudflare Workers中継（LINE Webhook等） | `workers.hassamu-izumi.jp` |

## 2. 技術スタック

| レイヤ | 採用 | バージョン |
|---|---|---|
| フレームワーク | Next.js（App Router・Turbopack） | `16.2.4` |
| ランタイム | React | `19.2.4` |
| 言語 | TypeScript（strict） | `^5` |
| スタイリング | Tailwind CSS v4（CSSファースト `@theme`） | `^4` |
| アイコン | lucide-react | `^1.14` |
| フォント | Noto Sans JP（next/font/google） | — |
| 解析 | @vercel/analytics | `^2.0` |
| ホスティング | Vercel（東京 hnd1） | — |
| パッケージ管理 | pnpm | `10+` |
| Node | Node.js | `20+` |

CMSはSprint 1で**ヘッドレスWordPress**（`cms.hassamu-izumi.jp`）に接続予定。連携層は実装済み（コミット `3afb737`）。

## 3. ディレクトリ構成

```
public-site/
├── src/
│   ├── app/                        # App Router（22ルート）
│   │   ├── layout.tsx / page.tsx   # ルートレイアウト + トップ
│   │   ├── globals.css             # Tailwind v4 @theme トークン
│   │   ├── sitemap.ts / robots.ts  # SEO
│   │   ├── opengraph-image.tsx     # OGP（@vercel/og）
│   │   ├── about/                  # 町内会について
│   │   ├── news/        [id]/      # お知らせ（SSG）
│   │   ├── events/      [id]/      # 行事（SSG）
│   │   ├── living/                 # 生活便利帳（trash / han-map / faq）
│   │   ├── disaster/               # 防災情報
│   │   ├── preview/                # 会員ページプレビュー
│   │   ├── join/                   # LINE登録案内
│   │   ├── privacy/, terms/        # プラポリ / 利用規約
│   │   └── contact/                # お問い合わせ（mailto）
│   ├── components/
│   │   ├── layout/                 # AppShell / Header / BottomNav / Footer
│   │   ├── home/                   # Hero / DisasterAlert / LatestNews / QuickNav
│   │   ├── living/                 # HanMap (use client)
│   │   └── preview/                # LineMessageMockup / MemberPageMockup
│   ├── lib/
│   │   ├── mockData.ts             # 表示用ドメイン型のサンプル（既存ページが使用）
│   │   ├── mockWpData.ts           # WP REST API形のモック（WP未構築時のフォールバック）
│   │   ├── wp-api.ts               # ヘッドレスWPクライアント（ISR 60秒）
│   │   ├── constants.ts            # 緊急連絡先・札幌市公式リンク
│   │   └── og.tsx                  # OGP共通生成
│   └── types/
│       ├── index.ts                # 表示用ドメイン型
│       └── wordpress.ts            # WP REST API返却型（WpPost / WpNews / …）
└── public/
    └── images/
```

## 4. 命名規約

| 対象 | 規約 | 例 |
|---|---|---|
| ファイル名 | kebab-case | `wp-api.ts`, `latest-news.tsx` |
| 関数名 | camelCase | `getNews`, `formatDate` |
| Reactコンポーネント | PascalCase | `LatestNews`, `HanMap` |
| 型・インタフェース | PascalCase（プレフィックスなし） | `News`, `WpPost`（`I-` や `T-` を付けない） |
| 環境変数 | SCREAMING_SNAKE_CASE | `WP_API_BASE_URL`, `NEXT_PUBLIC_SITE_URL` |
| DBカラム | snake_case（仕様書v1.2準拠） | `created_at`, `is_published` |
| Tailwindユーティリティ | 動的生成しない（固定文字列） | `text-red-500`（`text-${color}-500` 禁止） |

## 5. コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/)準拠。**日本語OK・絵文字なし**。

| 接頭辞 | 用途 |
|---|---|
| `feat:` | 新機能 |
| `fix:` | バグ修正 |
| `docs:` | ドキュメントのみ |
| `refactor:` | 動作を変えないリファクタ |
| `test:` | テスト追加・修正 |
| `chore:` | ビルド・設定・依存更新 |

例：`feat: prepare headless WP integration layer`

## 6. 重要な技術的決定事項

### ヘッドレスWP連携（Sprint 1）

- `src/lib/wp-api.ts` の `getNews / getBroadcastArchive / getFaqs / getEvents` を経由。
- **ISR 60秒**（`fetch(url, { next: { revalidate: 60 } })`）。SSGではなくISR。
- 環境変数 `WP_API_BASE_URL` で接続先切替。**未設定時は `mockWpData.ts` を返すフォールバック**。
- 8秒タイムアウト、404→`[]`、5xx/timeout→`WpApiError` throw。
- 認証は `WP_API_USERNAME` + `WP_API_APP_PASSWORD`（Application Password）。公開エンドポイントのみ叩く間は空でOK。

### Next.js 16 の作法

- **`middleware.ts` は廃止 → `proxy.ts` を使う**（admin/liff も同様）。
- `generateStaticParams` でSSG生成、それ以外はISRまたはStatic。
- メタデータは `metadata` を export（`title.template` で末尾自動化）。
- `params` / `searchParams` は **Promise**（async/await必須）。

### SEO・公開ステータス

- 現在 noindex（`layout.tsx` の `metadata.robots`、`robots.ts` で `Disallow: /`）。
- 役員会承認後の解除手順は `README.md` 参照。

## 7. やってはいけないこと

### 共通（全リポジトリ）

- ❌ 認証情報をチャットに貼らない（`.env.local` を直接ペーストしない）。
- ❌ `DATABASE_URL` を export したまま放置 → 使用後に必ず `unset DATABASE_URL`。
- ❌ プロジェクトを日本語パス配下に置かない（`~/Documents/Claude作業部屋/` 配下では Turbopack panic）。**`~/Dev/izumi-chonaikai/` のASCIIパスを使う**。

### public-site 固有

- ❌ `src/lib/mockData.ts` を勝手に削除しない。WP連携が全ページで完成するまで併用する（既存ページが依存中）。
- ❌ `WP_API_BASE_URL` 設定下で空配列を握り潰さない（`WpApiError` を意図的に throw する設計）。
- ❌ Tailwind ユーティリティを動的生成しない（`text-${color}-500` はビルド時に拾われない）。
- ❌ `next.revalidate` を `60` 以外に変更しない（複数fetchで一番低い値が採用されるため、不揃いだとキャッシュが意図せず短くなる）。

## 8. Local WP環境

Sprint 1 でWP REST APIを使った開発をする際の接続手順。

### 接続先

```
本体: http://hassamu-izumi-cms.local
REST API: http://hassamu-izumi-cms.local/wp-json/wp/v2
```

### .env.local

```bash
# .env.local.example をコピーして使用
cp .env.local.example .env.local

# 接続先を Local WP に向ける
WP_API_BASE_URL=http://hassamu-izumi-cms.local/wp-json/wp/v2

# Application Password（必要時のみ）
WP_API_USERNAME=
WP_API_APP_PASSWORD=
```

### モック ↔ Local WP の切替

| 状態 | `WP_API_BASE_URL` | 動作 |
|---|---|---|
| モック | 未設定（空） | `src/lib/mockWpData.ts` を返す |
| Local WP | `http://hassamu-izumi-cms.local/wp-json/wp/v2` | Local WP の REST API を叩く |
| 本番 | `https://cms.hassamu-izumi.jp/wp-json/wp/v2` | 本番 WP に接続 |

### 関数の使い方

```ts
import { getNews, getBroadcastArchive, getFaqs, getEvents } from "@/lib/wp-api";

// Server Component で直接呼ぶ
export default async function Page() {
  const news = await getNews({ perPage: 10 });
  return <NewsList items={news} />;
}
```

CPT 4種：`news` / `broadcast_archive` / `faq` / `event`（詳細スキーマはマスタープラン v2.1 章4）。

## 9. 関連文書

| 文書 | パス |
|---|---|
| マスタープラン v2.0 | `~/Documents/Claude作業部屋/泉町内会/docs/izumi-chonaikai-master-plan-v2_0.md` |
| データ仕様 v1.2 | `~/Documents/Claude作業部屋/泉町内会/docs/izumi-chonaikai-data-spec-v1.2.md` |
| 公開HP実装計画 v1.0 | `~/Documents/Claude作業部屋/泉町内会/docs/public-site-implementation-plan-v1.0.md` |
| 本リポジトリREADME | `./README.md` |
| Next.js 公式ドキュメント | `node_modules/next/dist/docs/` |
