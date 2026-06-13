/**
 * 町内会レベルの定数。
 * 役員ヒアリング待ちの値は仮置き（TODO コメントを残す）。
 */

export const CHONAIKAI_NAME = "発寒泉町内会";
export const CHONAIKAI_AREA = "札幌市西区 発寒11〜13条 3〜4丁目周辺";

/**
 * お問い合わせメール（仮）。
 * TODO: 役員会で実アドレス確定後に差し替え。
 */
export const CONTACT_EMAIL = "info@example.invalid";

/**
 * 緊急連絡先（公開可能な定数のみ）。
 */
export const EMERGENCY_NUMBERS = {
  fire: "119",
  police: "110",
} as const;

/**
 * LINE 公式アカウントへの永続的な友だち追加URL。
 * 役員会で発行された短縮URL（lin.ee）。差し替え時はここ一箇所のみ。
 */
export const LINE_ADD_FRIEND_URL = "https://lin.ee/zoFCyNY";

/**
 * 札幌市公式の外部リンク。
 */
export const SAPPORO_LINKS = {
  west_ward: "https://www.city.sapporo.jp/nishi/",
  hazard_map: "https://www.city.sapporo.jp/kikikanri/hazardmap/",
  trash_west: "https://www.city.sapporo.jp/seiso/gomi/index.html",
} as const;
