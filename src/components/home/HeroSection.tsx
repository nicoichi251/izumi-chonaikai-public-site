import Image from "next/image";
import Link from "next/link";

/**
 * ヒーロー。
 * SP: 簡潔なキャッチ + 2ボタン。
 * PC: ショールーム品質（大きめのタイポグラフィ + リード文）。
 * 他町内会がPCで見たときに「ここまでやるのか」と思わせる顔。
 */
export function HeroSection() {
  return (
    <section className="relative h-[320px] overflow-hidden rounded-xl border border-stone-200 lg:h-[440px]">
      <Image
        src="/images/hero-park.jpg"
        alt="発寒泉公園に立つ泉町会ののぼりと、緑に包まれた遊歩道"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 960px"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/25 to-transparent p-6 lg:p-10">
        <p className="mb-2 text-sm font-bold text-white/85 lg:text-base">
          札幌市西区発寒 ― 発寒泉町内会
        </p>
        <h2 className="mb-3 text-3xl font-black leading-tight text-white lg:mb-4 lg:text-5xl lg:leading-[1.15]">
          水と緑の街に、
          <br />
          ちょうどいいつながりを。
        </h2>
        <p className="mb-5 hidden max-w-xl text-sm leading-relaxed text-white/85 lg:block">
          回覧板はLINEに届き、行事の申込はワンタップ。
          紙のよさはそのままに、デジタルで「面倒くさくない町内会」をつくっています。
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/events"
            className="rounded-md bg-white px-5 py-3 text-center text-sm font-black text-stone-900 hover:bg-stone-100"
          >
            行事予定を見る
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-white/70 px-5 py-3 text-center text-sm font-black text-white hover:bg-white/10"
          >
            町内会について
          </Link>
        </div>
      </div>
    </section>
  );
}
