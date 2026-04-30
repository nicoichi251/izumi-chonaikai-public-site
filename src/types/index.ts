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
