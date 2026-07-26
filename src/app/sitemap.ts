import type { MetadataRoute } from "next";
import { getEvents, getNews } from "@/lib/wp-api";

// D1の最新コンテンツを常に反映するため動的レンダリング（旧ISR 60sの置き換え）
export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hassamu-izumi.vercel.app";

const STATIC_PATHS: ReadonlyArray<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/",                changeFrequency: "weekly",  priority: 1.0 },
  { path: "/about",           changeFrequency: "monthly", priority: 0.7 },
  { path: "/news",            changeFrequency: "weekly",  priority: 0.9 },
  { path: "/events",          changeFrequency: "weekly",  priority: 0.9 },
  { path: "/living",          changeFrequency: "monthly", priority: 0.7 },
  { path: "/living/trash",    changeFrequency: "monthly", priority: 0.6 },
  { path: "/living/han-map",  changeFrequency: "monthly", priority: 0.6 },
  { path: "/living/faq",      changeFrequency: "monthly", priority: 0.6 },
  { path: "/disaster",        changeFrequency: "monthly", priority: 0.8 },
  { path: "/preview",         changeFrequency: "monthly", priority: 0.8 },
  { path: "/join",            changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact",         changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy",         changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms",           changeFrequency: "monthly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [news, events] = await Promise.all([getNews({ perPage: 100 }), getEvents({ perPage: 100 })]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  const eventEntries: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${SITE_URL}/events/${e.id}`,
    lastModified: new Date(e.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/news/${n.id}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...eventEntries, ...newsEntries];
}
