import type {
  Aed,
  DisasterAlert,
  EvacuationSite,
  Event,
  Faq,
  HanInfo,
  News,
  TrashItem,
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
    body: "令和8年度の発寒泉町内会 定期総会に使用する資料をデジタル公開いたしました。会員の皆様は事務局からお送りした URL より内容をご確認ください。\n\n紙資料をご希望の方は、班長または事務局までお声がけください。",
  },
  {
    id: "NEWS_002",
    title: "発寒泉公園の遊具点検について",
    date: "2026-02-25",
    category: "生活情報",
    summary:
      "発寒泉公園の遊具安全点検を実施いたします。点検中は一部の遊具が使用禁止となります。",
    body: "発寒泉公園の遊具安全点検を、2026年3月5日 9:00〜12:00 に実施いたします。\n\n点検中は一部の遊具が使用禁止となります。お子様の利用にはご注意ください。",
  },
  {
    id: "NEWS_003",
    title: "春の一斉清掃のご案内",
    date: "2026-02-20",
    category: "行事",
    summary:
      "恒例の春の一斉清掃を実施します。集合場所は各班のゴミステーション前です。",
    body: "恒例の春の一斉清掃を 2026年4月19日（日）9:00 より実施します。\n\nきれいな街づくりのため、皆様のご協力をお願いいたします。軍手・ゴミ袋は町内会で用意します。集合場所は各班のゴミステーション前です。",
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

export const mockTrashSchedule: TrashItem[] = [
  { days: "月・木", category: "燃やせるゴミ",       colorClass: "text-red-500" },
  { days: "火",     category: "プラスチック",       colorClass: "text-pink-500" },
  { days: "水",     category: "びん・缶・ペットボトル", colorClass: "text-emerald-500" },
  { days: "金",     category: "燃やせないゴミ",     colorClass: "text-stone-500" },
  { days: "第2土",  category: "雑がみ・ダンボール", colorClass: "text-blue-500" },
];

export const mockFaqs: Faq[] = [
  {
    id: "FAQ_001",
    question: "ゴミステーションが汚れている時は？",
    answer:
      "清掃当番の班、または衛生部までお知らせください。お問い合わせフォームからもご連絡いただけます。",
  },
  {
    id: "FAQ_002",
    question: "町内会を退会したい場合は？",
    answer:
      "班長または事務局へ直接ご連絡ください。退会の手続き自体は簡単で、いつでも可能です。",
  },
  {
    id: "FAQ_003",
    question: "引っ越してきました。何をすればよいですか？",
    answer:
      "お住まいの番地から該当の班を「街区マップ」で確認のうえ、班長へご挨拶ください。LINE登録ページから登録すると、回覧板やお知らせがスマホに届きます。",
  },
  {
    id: "FAQ_004",
    question: "行事に参加したい場合は？",
    answer:
      "LINE会員になると、行事ごとの申込みが LINE 上で完結します。会員でない方も、お問い合わせフォームから事務局へお声がけください。",
  },
  {
    id: "FAQ_005",
    question: "LINE登録は必須ですか？",
    answer:
      "任意です。未登録の方には引き続き紙の回覧板をお届けします。LINE登録をするとよりタイムリーに情報が届きます。",
  },
  {
    id: "FAQ_006",
    question: "個人情報は連合町内会と共有されますか？",
    answer:
      "いいえ。発寒泉町内会で集めた名簿は、連合町内会・他団体・行政には渡しません。詳細はプライバシーポリシーをご確認ください。",
  },
  {
    id: "FAQ_007",
    question: "役員になりたいのですが、どうすればよいですか？",
    answer:
      "事務局までお気軽にお声がけください。年齢・性別・在住年数を問わず歓迎しています。",
  },
];

export const mockEvacuationSites: EvacuationSite[] = [
  {
    id: "EVAC_001",
    name: "札幌市西区民センター",
    address: "札幌市西区琴似2条7丁目",
    type: "指定避難所",
  },
  {
    id: "EVAC_002",
    name: "発寒小学校",
    address: "札幌市西区発寒11条4丁目",
    type: "指定避難所（基幹）",
  },
  {
    id: "EVAC_003",
    name: "発寒中学校",
    address: "札幌市西区発寒12条4丁目",
    type: "指定避難所",
  },
  {
    id: "EVAC_004",
    name: "西陵高等学校",
    address: "札幌市西区発寒13条11丁目",
    type: "指定避難所",
  },
];

export const mockAeds: Aed[] = [
  { id: "AED_001", name: "発寒泉町内会館",     hours: "開館時のみ" },
  { id: "AED_002", name: "発寒泉公園 管理棟",  hours: "9:00〜17:00" },
  { id: "AED_003", name: "西区消防署出張所",   hours: "24時間" },
  { id: "AED_004", name: "セブンイレブン発寒店", hours: "24時間" },
];
