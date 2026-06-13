import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Edit3,
  HelpCircle,
  QrCode,
  Smartphone,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { LineJoinCTA } from "@/components/cta/LineJoinCTA";
import { mockHanData } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "LINEで登録する",
  description:
    "発寒泉町内会のLINE会員登録方法。班ごとのQRコードと、登録の4ステップをご案内します。",
};

const STEPS = [
  {
    icon: QrCode,
    title: "自分の班のQRコードを探す",
    body: "下のQR一覧から、お住まいの班のコードを見つけます。",
  },
  {
    icon: Smartphone,
    title: "LINEでQRコードを読み取る",
    body: "LINEアプリの「ホーム」→「友だち追加」→「QRコード」で読み取ります。",
  },
  {
    icon: Edit3,
    title: "簡単な情報を入力",
    body: "氏名と班の確認だけ。約 30 秒で完了します。",
  },
  {
    icon: CheckCircle2,
    title: "登録完了！お知らせが届きます",
    body: "回覧板・行事のご案内・除雪情報などが LINE に届きます。",
  },
];

export default function JoinPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "LINEで登録する" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        LINEで登録する
      </h1>
      <p className="text-xs text-stone-500 leading-relaxed">
        所要時間は約 30 秒。下のボタンから直接友だち追加、または班ごとの QR コードでもご登録いただけます。
      </p>

      {/* 主導線：友だち追加（lin.ee） */}
      <LineJoinCTA
        title="LINEで会員登録"
        description="ボタンを押すと LINE が開き、友だち追加 → 簡単な情報入力で完了します。"
      />

      {/* 登録の流れ 4ステップ */}
      <section aria-label="登録の流れ" className="space-y-3">
        <h2 className="font-black text-stone-700 text-sm px-2">登録の流れ</h2>
        <ol className="space-y-3">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                className="bg-white rounded-2xl border border-stone-100 shadow-card p-5 flex items-start gap-4"
              >
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span
                    aria-hidden
                    className="w-10 h-10 bg-emerald-50 text-primary rounded-2xl flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </span>
                  <span className="text-[8px] font-black text-stone-500 tracking-widest font-mono">
                    STEP {idx + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-stone-800 text-sm leading-tight">
                    {s.title}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 班別QRコード一覧 */}
      <section aria-label="班別QRコード一覧" className="space-y-3">
        <h2 className="font-black text-stone-700 text-sm px-2">
          班別 QR コード（仮）
        </h2>
        <p className="text-[11px] text-stone-500 leading-relaxed px-2">
          以下は配置イメージです。実際の QR コードは役員会承認後に差し替え予定。
        </p>
        <ul className="grid grid-cols-3 gap-3">
          {mockHanData.map((han) => (
            <li
              key={han.id}
              className="bg-white rounded-2xl border border-stone-100 p-3 shadow-card text-center"
            >
              <div
                role="img"
                aria-label={`${han.name} の QR コード（プレースホルダ）`}
                className="aspect-square bg-stone-100 rounded-xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center mb-2"
              >
                <span className="text-2xl font-black text-stone-500 leading-none">
                  {han.id}
                </span>
                <span className="text-[7px] font-black text-stone-500 uppercase tracking-widest mt-1">
                  QR (仮)
                </span>
              </div>
              <p className="font-black text-stone-800 text-[11px] leading-tight">
                {han.name}
              </p>
              <p className="text-[9px] text-stone-500 mt-0.5 leading-tight">
                {han.landmark}
              </p>
            </li>
          ))}
        </ul>

        <Link
          href="/living/han-map"
          className="block bg-orange-50 border border-orange-100 rounded-2xl p-4 active:bg-orange-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="w-9 h-9 bg-white text-orange-600 rounded-xl flex items-center justify-center shrink-0"
            >
              <HelpCircle size={16} />
            </span>
            <div>
              <p className="font-black text-orange-800 text-xs leading-tight">
                自分の班がわからない方は
              </p>
              <p className="text-[10px] text-orange-600 mt-1 font-bold">
                街区マップで範囲とランドマークから確認 →
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* 注意事項 */}
      <section
        aria-label="注意事項"
        className="bg-white rounded-[2rem] border border-stone-100 p-6 shadow-card space-y-3"
      >
        <h2 className="font-black text-stone-700 text-sm">注意事項</h2>
        <ul className="space-y-2 text-[11px] text-stone-600 leading-relaxed">
          <li className="flex gap-2">
            <span aria-hidden className="text-primary font-black">•</span>
            <span>登録は<strong>任意</strong>です。未登録でも町内会員としての扱いに変わりはありません。</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-primary font-black">•</span>
            <span>LINE 未登録の方には、これまで通り紙の回覧板をお届けします。</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-primary font-black">•</span>
            <span>退会はいつでも可能です（LINE のブロックまたは事務局までご連絡）。</span>
          </li>
        </ul>
      </section>

      {/* プラポリ・利用規約への明示的リンク */}
      <section className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-6">
        <p className="text-xs text-stone-700 leading-relaxed mb-3">
          ご登録の前に、以下の文書も合わせてご確認ください。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/privacy"
            className="text-xs font-black text-primary underline"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/terms"
            className="text-xs font-black text-primary underline"
          >
            利用規約
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
