import Image from "next/image";
import Link from "next/link";

/**
 * ヒーロー：「水と緑の街、発寒泉へようこそ」。
 * 画像は public/images/hero.jpg にローカル配置（Phase 2 で実写へ差し替え予定）。
 */
export function HeroSection() {
  return (
    <section className="relative h-[300px] overflow-hidden rounded-xl border border-stone-200 lg:h-[340px]">
      <Image
        src="/images/hero.jpg"
        alt="水と緑に囲まれた札幌市西区発寒の街並み"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 640px"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6 lg:p-8">
        <h2 className="mb-4 text-2xl font-black leading-tight text-white lg:text-3xl">
          水と緑の街、
          <br />
          発寒泉へようこそ。
        </h2>
        <div className="flex gap-2">
          <Link
            href="/events"
            className="rounded-md bg-white px-4 py-2.5 text-center text-xs font-black text-stone-900 hover:bg-stone-100"
          >
            行事予定を見る
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-white/70 px-4 py-2.5 text-center text-xs font-black text-white hover:bg-white/10"
          >
            町内会について
          </Link>
        </div>
      </div>
    </section>
  );
}
