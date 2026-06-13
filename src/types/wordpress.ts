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
 *
 * - `category_tag`：ACF Select の英字スラッグ。未知の値が来ても落ちないよう
 *   既知タグの union + string にしておく。
 * - `published_at`：WP の `date` とは別に運用上の公開日（YYYY-MM-DD HH:MM:SS）。
 *   未設定時は呼び出し側で `WpPost.date` にフォールバックする。
 * - `is_pinned`：true をリスト先頭に固定する用途。
 * - `visibility` / `show_form` / `form_type`：会員出し分け設定（mu-plugin の
 *   group_membership_visibility.json で定義）。public-site では
 *   `visibility ∈ {public, both}` のみ表示し、`show_form=true` の記事には
 *   LIFF会員ページへの誘導CTAを出す。
 */
export type WpNewsCategoryTag =
  | "important"
  | "event"
  | "disaster"
  | "living"
  | "info";

/**
 * 会員出し分けの公開範囲。
 * - public：HP のみ
 * - members：LIFF（会員アプリ）のみ。HP では非表示。
 * - both：HP と LIFF の両方
 * - undefined：レガシー記事（visibility 未設定）は public 扱い（後方互換）
 */
export type WpVisibility = "public" | "members" | "both";

/**
 * `show_form=true` のときに描画するフォーム種別。
 * - none：表示しない（show_form OFF と等価）
 * - event_entry：参加申込（LIFFで処理）
 * - circular_confirm：回覧板の確認（LIFFで処理）
 */
export type WpFormType = "none" | "event_entry" | "circular_confirm";

/**
 * 会員出し分け設定の共通フィールド。news / events 双方に同じ形で乗る。
 */
export type WpMembershipVisibilityAcf = {
  visibility?: WpVisibility | (string & {});
  show_form?: boolean;
  form_type?: WpFormType | (string & {});
};

export type WpNewsAcf = WpMembershipVisibilityAcf & {
  published_at?: string;
  category_tag?: WpNewsCategoryTag | (string & {});
  is_pinned?: boolean;
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
 * events（行事）CPT。
 * 開催日・場所・主催・申込URLをACFに格納。
 *
 * - `event_date`：開催日（YYYY-MM-DD）。
 * - `event_time`：開始時刻（HH:MM:SS）。
 * - `signup_url`：未設定時は WP から空文字で返る（null ではない）。
 */
export type WpEventAcf = WpMembershipVisibilityAcf & {
  event_date?: string;
  event_time?: string;
  event_location?: string;
  event_organizer?: string;
  signup_url?: string;
  is_canceled?: boolean;
};

export type WpEvent = WpPost<WpEventAcf, "events">;

export type WpCollection = WpNews | WpBroadcastArchive | WpFaq | WpEvent;
