import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { MEMBER_PAGE_URL } from "@/lib/site";

const BENEFITS = [
  "回覧板がスマホに届き、ワンタップで「確認」",
  "夏祭りなど行事の申込がLINEで完結",
  "災害時の緊急連絡・除雪情報をすぐ受信",
] as const;

/**
 * LINE会員登録の主導線カード。
 * ホーム（PCはサイドバー上部・SPは本文中）と記事詳細下部で使い回す。
 */
export function LineJoinCard() {
  return (
    <section
      aria-label="LINE会員登録のご案内"
      className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-card"
    >
      <div className="border-b-2 border-line bg-stone-50 px-5 py-3">
        <p className="text-sm font-black text-stone-900">
          LINE会員登録のご案内
          <span className="ml-2 align-middle text-xs font-bold text-stone-500">
            無料・約30秒
          </span>
        </p>
      </div>
      <div className="space-y-4 px-5 py-4">
        <ul className="space-y-2">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm font-bold text-stone-700">
              <Check size={15} aria-hidden className="mt-0.5 shrink-0 text-line" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/join"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-line py-3 text-sm font-black text-white transition-colors hover:bg-line-dark active:bg-line-dark"
        >
          <MessageCircle size={16} aria-hidden />
          友だち追加して登録する
        </Link>
        <p className="text-center text-xs text-stone-500">
          <Link href="/preview" className="underline underline-offset-2 hover:text-primary">
            登録すると見られる画面を先にのぞく
          </Link>
        </p>
        <p className="border-t border-stone-100 pt-3 text-center text-xs font-bold text-stone-600">
          すでに会員の方は{" "}
          <a href={MEMBER_PAGE_URL} className="text-primary underline underline-offset-2">
            LINEで会員ページを開く
          </a>
        </p>
      </div>
    </section>
  );
}
