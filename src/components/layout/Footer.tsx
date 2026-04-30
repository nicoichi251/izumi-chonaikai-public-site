import Link from "next/link";

/**
 * フッター：著作権表記・プラポリ/利用規約/お問い合わせへのリンク。
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="shrink-0 px-6 py-4 bg-white border-t border-stone-100 text-[10px] text-stone-500">
      <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center mb-2">
        <Link href="/privacy" className="hover:text-primary">
          プライバシーポリシー
        </Link>
        <span aria-hidden>·</span>
        <Link href="/terms" className="hover:text-primary">
          利用規約
        </Link>
        <span aria-hidden>·</span>
        <Link href="/contact" className="hover:text-primary">
          お問い合わせ
        </Link>
      </div>
      <p className="text-center font-bold tracking-widest text-stone-500">
        © {year} 発寒泉町内会
      </p>
    </footer>
  );
}
