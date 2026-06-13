import type {
  WpMembershipVisibilityAcf,
  WpPost,
} from "@/types/wordpress";

/**
 * 公開HP 出し分けユーティリティ。
 *
 * WP 側の ACF フィールド `visibility / show_form / form_type` を解釈し、
 * 公開HPに出すか否か（visibility）と、会員誘導CTAを出すか（show_form）を判定する。
 *
 * 仕様（Phase 2 マスター指示書 §①）：
 *  - visibility ∈ {public, both} → HP に表示
 *  - visibility = members        → HP では非表示（LIFF のみ）
 *  - visibility undefined        → public 扱い（既存記事の後方互換）
 *  - show_form = true            → HP では「会員ページで申込/確認できます」CTA を表示
 *                                  （実フォーム描画は LIFF 側で行う）
 */

type AcfHolder = { acf?: WpMembershipVisibilityAcf };

/**
 * HP で表示してよいか。
 * 既存記事（visibility 未設定）は public 扱いで表示する（破壊的変更を避ける）。
 */
export function isPublicVisible(post: AcfHolder): boolean {
  const v = post.acf?.visibility;
  if (!v) return true;
  return v === "public" || v === "both";
}

/**
 * HP の詳細ページで「会員ページへ」CTA を出すべきか。
 * show_form が ON のときのみ true。form_type の中身は LIFF 側で解釈する。
 */
export function shouldShowMemberCta(post: AcfHolder): boolean {
  return post.acf?.show_form === true;
}

/**
 * 公開HPに出してよい記事だけを残すフィルタ。
 * sort/slice よりも先に通すこと（per_page と count がずれるのは許容＝
 *   members 記事はそもそも HP に出さないため数合わせ不要）。
 */
export function filterPublicVisible<T extends AcfHolder>(items: T[]): T[] {
  return items.filter(isPublicVisible);
}

/**
 * 詳細ページ用：取得した1件が members（HP非表示）なら null に潰す。
 * 呼び出し側で notFound() を起こすための薄い変換。
 */
export function gateSingleForPublic<T extends WpPost<WpMembershipVisibilityAcf, string>>(
  post: T | null,
): T | null {
  if (!post) return null;
  return isPublicVisible(post) ? post : null;
}

/**
 * show_form のときに案内する CTA 文言（form_type で文言を切替）。
 * LIFF 側のフォームと実装内容が一致するように管理。
 */
export function memberCtaCopy(form_type: string | undefined): {
  title: string;
  body: string;
} {
  switch (form_type) {
    case "event_entry":
      return {
        title: "参加申込は会員ページから",
        body: "この行事はLINE会員ページから人数を選んで申込みできます。",
      };
    case "circular_confirm":
      return {
        title: "回覧の確認は会員ページから",
        body: "この回覧は会員ページで「確認しました」を押すと記録されます。",
      };
    default:
      return {
        title: "続きは会員ページで",
        body: "会員専用の情報・操作はLINE会員ページからご利用いただけます。",
      };
  }
}
