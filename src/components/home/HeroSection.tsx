import Image from "next/image";
import Link from "next/link";

/**
 * ヒーロー：「水と緑の街、発寒泉へようこそ」。
 * index.html の最初のヒーローを Next.js Image 化。
 */
export function HeroSection() {
  return (
    <section className="relative h-[380px] rounded-[3.5rem] overflow-hidden shadow-2xl">
      <Image
        src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800"
        alt="水と緑に囲まれた札幌市西区発寒の街並み"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 400px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
        <h2 className="text-white text-3xl font-black leading-tight mb-6">
          水と緑の街、
          <br />
          発寒泉へようこそ。
        </h2>
        <Link
          href="/events"
          className="bg-white text-stone-900 w-full py-4 rounded-full font-black text-sm shadow-xl text-center"
        >
          行事予定を確認
        </Link>
      </div>
    </section>
  );
}
