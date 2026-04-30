/**
 * 公開HPで扱うドメイン型。
 * 実コンテンツ流入後（Phase 2 GAS連携）も同じ型を再利用する想定。
 */

export type NewsCategory = "お知らせ" | "生活情報" | "防災" | "行事";

export type News = {
  id: string;
  title: string;
  date: string; // ISO 8601 (YYYY-MM-DD)
  category: NewsCategory;
  summary: string;
  /**
   * 詳細ページ本文（マークダウン未使用、改行は段落区切り）。
   */
  body?: string;
};

export type Event = {
  id: string;
  title: string;
  date: string; // ISO 8601
  location: string;
  description: string;
  image?: string;
};

export type HanInfo = {
  id: number;
  name: string;
  range: string;
  landmark: string;
  /**
   * 班長氏名は公開HPには出さない方針（個人情報保護）。
   * mockHanData では参考情報として保持するだけで、UIにはレンダリングしない。
   */
  leader?: string;
};

export type AlertSeverity = "high" | "medium" | "low";

export type DisasterAlert = {
  id: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string; // ISO 8601
  source?: string;
};

export type TrashItem = {
  days: string; // 「月・木」「火」など
  category: string; // 「燃やせるゴミ」など
  /**
   * カテゴリに合わせた強調色クラス（text-red-500 等）。
   * 安全に Tailwind に拾わせるため固定文字列で指定する規約。
   */
  colorClass: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type EvacuationSite = {
  id: string;
  name: string;
  address: string;
  /**
   * 避難所種別（指定避難所 / 福祉避難所 など）。
   */
  type: string;
};

export type Aed = {
  id: string;
  name: string; // 設置場所
  hours: string; // 利用可能時間
};
