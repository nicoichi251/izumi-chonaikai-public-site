import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { LineMessageMockup } from "@/components/preview/LineMessageMockup";
import { MemberPageMockup } from "@/components/preview/MemberPageMockup";
import { LineJoinCTA } from "@/components/cta/LineJoinCTA";

export const metadata: Metadata = {
  title: "会員ページのプレビュー",
  description:
    "LINE会員になると届く通知例・会員専用画面のイメージ・プライバシーへの配慮を、登録前に確認できます。",
};

const SAMPLE_MESSAGES: Array<{ body: string; time: string; read?: boolean }> = [
  {
    body:
      "本日深夜2:00より、12条通り周辺で除雪を実施します。\n路上駐車にご注意ください。",
    time: "2時間前",
  },
  {
    body:
      "【行事のお知らせ】4/19(日) 9:00 より春の一斉清掃を行います。各班ゴミステーション前にお集まりください。",
    time: "昨日",
    read: true,
  },
  {
    body:
      "発寒泉公園の遊具点検（3/5 9:00〜12:00）を実施します。点検中は一部の遊具が使えません。",
    time: "3日前",
    read: true,
  },
];

const PROMISES = [
  {
    title: "必要最小限の情報しか集めません",
    body: "氏名と所属する班だけを伺います。電話番号や住所の入力は必須ではありません。",
  },
  {
    title: "連合町内会にも他団体にも名簿は渡しません",
    body:
      "発寒泉町内会で集めた会員情報は、連合町内会・行政・他団体には共有しません。",
  },
  {
    title: "いつでも退会できます",
    body:
      "LINE のブロックや事務局へのご連絡で、いつでも退会していただけます。退会理由を伺うこともありません。",
  },
];

export default function PreviewPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "プレビュー" }]}
      />

      {/* ヒーロー */}
      <section className="bg-primary rounded-[3rem] p-8 shadow-lifted text-white">
        <div className="flex items-center gap-2 mb-3 text-emerald-200">
          <Sparkles size={16} aria-hidden />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Members Preview
          </span>
        </div>
        <h1 className="text-2xl font-black leading-tight mb-3">
          LINE会員になると、
          <br />
          こんな情報が届きます。
        </h1>
        <p className="text-sm text-emerald-100/90 leading-relaxed">
          登録は無料、いつでも退会できます。
          実際にどんな通知が届き、どんな画面が見られるのかを
          このページで先にご確認ください。
        </p>
      </section>

      {/* LINE通知の例 */}
      <section
        aria-label="LINE通知の例"
        className="bg-emerald-50/60 rounded-[2.5rem] border border-emerald-100 p-6 space-y-5"
      >
        <h2 className="font-black text-stone-700 text-sm flex items-center gap-2">
          <MessageCircle size={16} aria-hidden className="text-primary" />
          LINEに届くお知らせの例
        </h2>
        <div className="space-y-5">
          {SAMPLE_MESSAGES.map((m, idx) => (
            <LineMessageMockup
              key={idx}
              body={m.body}
              time={m.time}
              read={m.read}
            />
          ))}
        </div>
        <p className="text-[10px] text-stone-500 leading-relaxed">
          ※ 実際の文面・配信タイミングはサンプルです。
        </p>
      </section>

      {/* 会員専用画面の例 */}
      <section aria-label="会員専用画面の例" className="space-y-4">
        <h2 className="font-black text-stone-700 text-sm flex items-center gap-2 px-2">
          <Sparkles size={16} aria-hidden className="text-primary" />
          会員専用画面の例
        </h2>
        <MemberPageMockup />
      </section>

      {/* プライバシーへの配慮 */}
      <section
        aria-label="プライバシーへの配慮"
        className="bg-white rounded-[2.5rem] border border-stone-100 p-6 shadow-card space-y-4"
      >
        <h2 className="font-black text-stone-700 text-sm flex items-center gap-2">
          <ShieldCheck size={16} aria-hidden className="text-primary" />
          プライバシーへの配慮（3つのお約束）
        </h2>
        <ul className="space-y-3">
          {PROMISES.map((p, idx) => (
            <li
              key={p.title}
              className="bg-stone-50 rounded-2xl p-4 border border-stone-100"
            >
              <p className="font-black text-primary text-xs mb-1">
                {idx + 1}. {p.title}
              </p>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-[10px] text-stone-500 leading-relaxed">
          詳細は{" "}
          <Link href="/privacy" className="text-primary font-bold underline">
            プライバシーポリシー
          </Link>{" "}
          をご確認ください。
        </p>
      </section>

      {/* CTA */}
      <LineJoinCTA
        variant="compact"
        title="準備はいいですか？"
        description="所要時間は約 30 秒・無料・いつでも退会できます。下のボタンから直接友だち追加に進めます。"
      />

      <p className="text-[10px] text-stone-500 text-center -mt-2">
        班ごとの QR コードからも登録できます：
        <Link
          href="/join"
          className="text-primary font-bold underline ml-1"
        >
          班別QR一覧へ
        </Link>
      </p>
    </PageShell>
  );
}
