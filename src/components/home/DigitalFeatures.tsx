import Link from "next/link";
import { Bell, CalendarCheck, Images } from "lucide-react";

const FEATURES = [
  {
    icon: Bell,
    title: "回覧板はLINEに届く",
    body: "紙を回す手間なし。スマホで読んで「確認しました」を押すだけ。既読は役員に自動で集計されます。",
  },
  {
    icon: CalendarCheck,
    title: "行事の申込はワンタップ",
    body: "夏祭りも子ども会も、LINEから30秒で参加申込。集計表への転記作業はもうありません。",
  },
  {
    icon: Images,
    title: "行事の写真をアルバムで",
    body: "イベントの写真・動画を会員だけに共有。顔が写る写真も安心の会員限定公開です。",
  },
] as const;

/**
 * 「デジタルでも、ちゃんと町内会。」セクション。
 * 住民には便利さの説明、PCで見る他町内会には取り組みのショーケース。
 */
export function DigitalFeatures() {
  return (
    <section aria-label="デジタル化の取り組み" className="space-y-4 lg:space-y-6">
      <div className="border-l-4 border-primary pl-3">
        <h3 className="text-lg font-black text-stone-900 lg:text-2xl">
          デジタルでも、ちゃんと町内会。
        </h3>
        <p className="mt-1 text-sm text-stone-600">
          発寒泉町内会は、LINEを使った新しい運営に取り組んでいます。
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-3 lg:gap-5">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-stone-200 bg-white p-5 shadow-card lg:p-6"
          >
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white"
            >
              <Icon size={20} />
            </span>
            <h4 className="mt-3.5 text-base font-black text-stone-900">{title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{body}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-stone-600">
        このしくみは「<strong>NICO TOWN</strong>」として他の町内会・自治会にも導入いただけます。
        ご興味のある方は{" "}
        <Link href="/contact" className="font-bold text-primary underline underline-offset-2">
          お問い合わせ
        </Link>{" "}
        からどうぞ。
      </p>
    </section>
  );
}
