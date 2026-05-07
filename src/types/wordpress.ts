/**
 * ヘッドレスWordPress連携用の型定義。
 *
 * 接続先：`cms.hassamu-izumi.jp`（WP REST API v2 / `/wp-json/wp/v2`）
 * 取得形式：`?_embed=true` 付与で `_embedded` フィールドが添付される前提。
 *
 * 公開HPの表示用ドメイン型（`@/types`）とは独立。
 * WP→表示型の変換は呼び出し側で行う（`src/lib/wp-api.ts` 参照）。
 */

export type WpRendered = {
  rendered: string;
  protected?: boolean;
};

export type WpStatus = "publish" | "future" | "draft" | "pending" | "private";

export type WpFeaturedMediaSize = {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
};

export type WpFeaturedMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_type: "image" | "file";
  mime_type: string;
  media_details?: {
    width?: number;
    height?: number;
    file?: string;
    sizes?: Record<string, WpFeaturedMediaSize>;
  };
};

export type WpTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  link?: string;
};

export type WpAuthor = {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
};

export type WpEmbedded = {
  "wp:featuredmedia"?: WpFeaturedMedia[];
  "wp:term"?: WpTerm[][];
  author?: WpAuthor[];
};

/**
 * 全Custom Post Typeの共通基底。
 * WP標準の投稿フィールドのうち、フロントで利用するものに絞り込んでいる。
 */
export type WpPost<TAcf = Record<string, unknown>, TType extends string = string> = {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: WpStatus;
  type: TType;
  link: string;
  title: WpRendered;
  content: WpRendered;
  excerpt: WpRendered;
  featured_media: number;
  acf?: TAcf;
  _embedded?: WpEmbedded;
};

/**
 * news（お知らせ）CPT。
 * 既存の `News` 型と意味的に対応するが、WP側はrendered HTML + ACFカテゴリ。
 */
export type WpNewsAcf = {
  category?: "お知らせ" | "生活情報" | "防災" | "行事";
  summary?: string;
  pinned?: boolean;
};

export type WpNews = WpPost<WpNewsAcf, "news">;

/**
 * broadcast_archive（広報アーカイブ）CPT。
 * 過去の広報誌・回覧物のPDFをアーカイブする。
 */
export type WpBroadcastArchiveAcf = {
  issue_date?: string;
  issue_number?: string;
  pdf_url?: string;
  pdf_size_bytes?: number;
  page_count?: number;
};

export type WpBroadcastArchive = WpPost<WpBroadcastArchiveAcf, "broadcast_archive">;

/**
 * faq（よくある質問）CPT。
 * WPでは title=question / content=answer をデフォルト運用。
 */
export type WpFaqAcf = {
  category?: string;
  sort_order?: number;
};

export type WpFaq = WpPost<WpFaqAcf, "faq">;

/**
 * event（行事）CPT。
 * 開催日・場所・募集状況をACFに格納。
 */
export type WpEventAcf = {
  event_date?: string;
  event_end_date?: string;
  location?: string;
  capacity?: number;
  registration_url?: string;
  is_canceled?: boolean;
};

export type WpEvent = WpPost<WpEventAcf, "event">;

export type WpCollection = WpNews | WpBroadcastArchive | WpFaq | WpEvent;
