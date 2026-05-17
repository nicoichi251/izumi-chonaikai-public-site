/**
 * WP REST API のレンダリング済み文字列を表示用に整形するユーティリティ。
 *
 * - `decodeHtmlEntities`：title.rendered などのHTMLエンティティを実体に戻す。
 * - `stripHtml`：excerpt.rendered からタグを落としてプレーンテキスト化（descriptionMeta等）。
 * - `formatJpDate`：YYYY-MM-DD（または ISO 文字列） → 「2026年6月7日」。
 * - `formatJpTime`：HH:MM:SS → 「9:00」（秒省略・先頭ゼロなし）。
 */

export const decodeHtmlEntities = (input: string): string =>
  input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");

export const stripHtml = (input: string): string =>
  decodeHtmlEntities(input.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();

export const formatJpDate = (raw: string | undefined): string => {
  if (!raw) return "";
  const datePart = raw.split(/[ T]/)[0];
  const [y, m, d] = datePart.split("-").map(Number);
  if (!y || !m || !d) return raw;
  return `${y}年${m}月${d}日`;
};

export const formatJpTime = (raw: string | undefined): string => {
  if (!raw) return "";
  const [h, m] = raw.split(":");
  const hour = Number(h);
  if (!Number.isFinite(hour)) return raw;
  return `${hour}:${m ?? "00"}`;
};
