import type { MetadataRoute } from "next";

/**
 * 役員会承認前は全クローラを拒否。サイトマップ参照も意図的に外し、
 * クローラへのヒントを一切残さない。
 * 承認・正式公開時に allow と sitemap 指定へ戻す。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
