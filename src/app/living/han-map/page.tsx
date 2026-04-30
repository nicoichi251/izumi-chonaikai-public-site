import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { HanMap } from "@/components/living/HanMap";
import { mockHanData } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "街区・班分けマップ",
  description:
    "発寒泉町内会の12班について、範囲とランドマークから自分の班を確認できます。個人情報は表示しません。",
};

export default function HanMapPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/living", label: "生活便利帳" },
          { label: "街区マップ" },
        ]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        街区・班分けマップ
      </h1>
      <p className="text-xs text-stone-500 leading-relaxed">
        12 個の班の範囲とランドマークから、お住まいの班を確認できます。
        個人情報保護のため、班長氏名は掲載していません。
      </p>

      <HanMap hanData={mockHanData} />

      <p className="text-[10px] text-stone-400 leading-relaxed">
        ご自身の班がはっきりしない場合は、お問い合わせフォームから事務局までご連絡ください。
      </p>
    </PageShell>
  );
}
