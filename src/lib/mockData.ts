import type {
  DisasterAlert,
  Event,
  HanInfo,
  News,
} from "@/types";

/**
 * Phase 1 のサンプルデータ。
 * 段階的に実コンテンツへ差し替え（Phase 2 GAS連携で Google Sheets を読む）。
 */

export const mockNews: News[] = [
  {
    id: "NEWS_001",
    title: "令和8年度の総会資料を公開しました",
    date: "2026-03-01",
    category: "お知らせ",
    summary: "令和8年度 定期総会の資料をデジタル公開いたしました。",
  },
  {
    id: "NEWS_002",
    title: "発寒泉公園の遊具点検について",
    date: "2026-02-25",
    category: "生活情報",
    summary:
      "発寒泉公園の遊具安全点検を実施いたします。点検中は一部の遊具が使用禁止となります。",
  },
  {
    id: "NEWS_003",
    title: "春の一斉清掃のご案内",
    date: "2026-02-20",
    category: "行事",
    summary:
      "恒例の春の一斉清掃を実施します。集合場所は各班のゴミステーション前です。",
  },
];

export const mockEvents: Event[] = [
  {
    id: "EVT_001",
    title: "新春もちつき大会",
    date: "2027-01-12",
    location: "発寒泉公園",
    description:
      "地域の皆様と新年を祝う恒例行事です。つきたてのお餅とおしるこをご用意してお待ちしております。",
    image:
      "https://images.unsplash.com/photo-1590559063737-01e40398698c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "EVT_002",
    title: "春の一斉清掃",
    date: "2026-04-19",
    location: "各班ゴミステーション前",
    description:
      "きれいな街づくりのため、皆様のご協力をお願いいたします。軍手・ゴミ袋は町内会で用意します。",
  },
];

export const mockHanData: HanInfo[] = [
  { id: 1,  name: "1班",  range: "発寒11条3丁目 1-10",  landmark: "発寒泉公園北側",     leader: "佐藤" },
  { id: 2,  name: "2班",  range: "発寒11条3丁目 11-20", landmark: "泉児童会館周辺",     leader: "鈴木" },
  { id: 3,  name: "3班",  range: "発寒11条4丁目 1-5",   landmark: "セブンイレブン付近", leader: "高橋" },
  { id: 4,  name: "4班",  range: "発寒11条4丁目 6-15",  landmark: "町内会館周辺",       leader: "田中" },
  { id: 5,  name: "5班",  range: "発寒12条3丁目 1-8",   landmark: "泉緑地東側",         leader: "伊藤" },
  { id: 6,  name: "6班",  range: "発寒12条3丁目 9-18",  landmark: "中央通り沿い北",     leader: "渡辺" },
  { id: 7,  name: "7班",  range: "発寒12条4丁目 1-10",  landmark: "消防署出張所付近",   leader: "山本" },
  { id: 8,  name: "8班",  range: "発寒12条4丁目 11-20", landmark: "泉中学校南側",       leader: "中村" },
  { id: 9,  name: "9班",  range: "発寒13条3丁目 1-12",  landmark: "JR線路沿いエリア",   leader: "小林" },
  { id: 10, name: "10班", range: "発寒13条3丁目 13-25", landmark: "発寒泉公園南側",     leader: "加藤" },
  { id: 11, name: "11班", range: "発寒13条4丁目 1-15",  landmark: "発寒交番周辺",       leader: "吉田" },
  { id: 12, name: "12班", range: "発寒13条4丁目 16-30", landmark: "地区センター東側",   leader: "山田" },
];

export const mockDisasterAlerts: DisasterAlert[] = [
  {
    id: "ALERT_001",
    severity: "high",
    message: "【札幌市】西区発寒地区：大雪警報に伴う除雪体制の発動",
    timestamp: "2026-04-29T08:00:00+09:00",
    source: "札幌市防災RSS",
  },
];
