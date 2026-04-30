import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageShell } from "@/components/layout/PageShell";
import { CONTACT_EMAIL, EMERGENCY_NUMBERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "発寒泉町内会へのお問い合わせ窓口。会員でない方からのご連絡や緊急時連絡先、LINE登録のご案内。",
};

const mailtoHref = (() => {
  const subject = encodeURIComponent("【発寒泉町内会HP】お問い合わせ");
  const body = encodeURIComponent(
    "お名前：\nご連絡先（任意）：\n\nお問い合わせ内容：\n",
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
})();

export default function ContactPage() {
  return (
    <PageShell>
      <Breadcrumb
        items={[{ href: "/", label: "ホーム" }, { label: "お問い合わせ" }]}
      />
      <h1 className="text-3xl font-black text-stone-800 leading-tight pt-2">
        お問い合わせ
      </h1>

      <p className="text-xs text-stone-500 leading-relaxed">
        会員でない方や、これから加入をご検討の方は、以下のいずれかの方法でご連絡ください。
      </p>

      <a
        href={mailtoHref}
        className="block bg-primary text-white p-8 rounded-[3rem] shadow-lifted active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center gap-3 mb-3">
          <Mail size={20} aria-hidden />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200">
            Email
          </span>
        </div>
        <p className="font-black text-xl mb-2 leading-tight">
          メールで問い合わせる
        </p>
        <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
          お使いのメールアプリが起動し、件名と入力欄が自動でセットされます。
        </p>
        <p className="text-[10px] font-mono bg-primary-dark/40 inline-block px-3 py-1 rounded-full">
          {CONTACT_EMAIL}
        </p>
      </a>

      <Link
        href="/join"
        className="block bg-white p-6 rounded-[2.5rem] border border-stone-100 shadow-card active:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="w-12 h-12 bg-emerald-50 text-primary rounded-2xl flex items-center justify-center shadow-sm shrink-0"
          >
            <MessageCircle />
          </span>
          <div className="flex-1">
            <p className="font-black text-stone-800 text-sm">
              会員の方は LINE から
            </p>
            <p className="text-[11px] font-bold text-stone-500 mt-1">
              登録すると LINE トークから事務局へ直接連絡できます
            </p>
          </div>
        </div>
      </Link>

      <section className="bg-red-50 border border-red-100 rounded-[2.5rem] p-6">
        <div className="flex items-center gap-2 mb-3 text-red-600">
          <Phone size={16} aria-hidden />
          <h2 className="font-black text-[10px] tracking-widest uppercase">
            緊急時はこちら
          </h2>
        </div>
        <ul className="space-y-2">
          <li className="flex justify-between text-sm">
            <span className="font-black text-red-800">消防・救急</span>
            <a
              href={`tel:${EMERGENCY_NUMBERS.fire}`}
              className="font-black text-red-600"
            >
              {EMERGENCY_NUMBERS.fire}
            </a>
          </li>
          <li className="flex justify-between text-sm">
            <span className="font-black text-red-800">警察</span>
            <a
              href={`tel:${EMERGENCY_NUMBERS.police}`}
              className="font-black text-red-600"
            >
              {EMERGENCY_NUMBERS.police}
            </a>
          </li>
        </ul>
      </section>

      <p className="text-[10px] text-stone-500 leading-relaxed">
        ※ メールアドレスは仮設定です。役員会承認後に正式アドレスへ差し替えます。
      </p>
    </PageShell>
  );
}
