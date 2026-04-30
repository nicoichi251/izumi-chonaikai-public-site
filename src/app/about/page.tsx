import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { mockHanData } from "@/lib/mockData";
import { CHONAIKAI_AREA, CHONAIKAI_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "町内会について",
  description: `${CHONAIKAI_NAME}の紹介、エリア、12班の構成、連合町内会との関係、子ども会についてをまとめています。`,
};

export default function AboutPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "町内会について" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        町内会について
      </h1>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-card border border-stone-100">
        <h2 className="font-black text-primary text-sm uppercase tracking-widest mb-3">
          {CHONAIKAI_NAME} とは
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          {CHONAIKAI_NAME}は、{CHONAIKAI_AREA}を区域とする地域コミュニティです。
          12 の班に分かれ、ゴミステーションの管理、回覧板の運用、防災訓練、
          年中行事の運営などを通じて「水と緑の街」を支えています。
        </p>
      </section>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-card border border-stone-100">
        <h2 className="font-black text-primary text-sm uppercase tracking-widest mb-3">
          エリア
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          札幌市西区の西側、JR 函館本線の北に広がる住宅街エリアです。
          発寒泉公園・泉緑地・泉児童会館など、子育て世帯に親しまれる
          公共施設が徒歩圏に集まっています。
        </p>
      </section>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-card border border-stone-100">
        <h2 className="font-black text-primary text-sm uppercase tracking-widest mb-4">
          12 班の構成
        </h2>
        <ul className="grid grid-cols-2 gap-2">
          {mockHanData.map((han) => (
            <li
              key={han.id}
              className="bg-stone-50 rounded-2xl p-3 text-[11px] text-stone-600 leading-tight"
            >
              <p className="font-black text-stone-800 text-xs mb-1">
                {han.name}
              </p>
              <p className="font-bold">{han.range}</p>
              <p className="text-stone-400 mt-1">{han.landmark}</p>
            </li>
          ))}
        </ul>
        <p className="text-[10px] text-stone-400 mt-4">
          班長氏名は個人情報のため公開していません。お住まいの班の班長は事務局までお問い合わせください。
        </p>
      </section>

      <section className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100">
        <h2 className="font-black text-primary text-sm uppercase tracking-widest mb-3">
          連合町内会との関係
        </h2>
        <p className="text-sm text-stone-700 leading-relaxed mb-3">
          近隣の町内会とともに連合町内会を構成し、合同での祭りや防災訓練を実施しています。
        </p>
        <p className="text-sm text-stone-700 leading-relaxed">
          ただし、{CHONAIKAI_NAME}で集めた住民の名簿は、
          連合町内会にも他の団体にも渡しません。
          会員データの扱いは町内会内で完結する設計とし、
          皆様の情報を必要最小限の範囲でしか使わないことをお約束します。
        </p>
      </section>

      <section className="bg-white rounded-[2.5rem] p-8 shadow-card border border-stone-100">
        <h2 className="font-black text-primary text-sm uppercase tracking-widest mb-3">
          子ども会について
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          子ども会は町内会と連携しつつ、独立した運営を行っています。
          ラジオ体操・夏祭り・クリスマス会などのイベントを通じて、
          地域の子どもたちの居場所づくりを担っています。
          詳細は各班の班長または事務局までお問い合わせください。
        </p>
      </section>
    </PageShell>
  );
}
