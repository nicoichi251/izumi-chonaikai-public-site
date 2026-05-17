import type {
  WpBroadcastArchive,
  WpEvent,
  WpFaq,
  WpNews,
} from "@/types/wordpress";
import {
  mockWpBroadcastArchive,
  mockWpEvents,
  mockWpFaqs,
  mockWpNews,
} from "./mockWpData";

/**
 * ヘッドレスWordPress（cms.hassamu-izumi.jp）への薄いクライアント。
 *
 * - ISR：`next.revalidate = 60` で60秒ごとに再生成。
 * - フォールバック：`WP_API_BASE_URL` 未設定時はモックを返す（WP構築前のDX確保）。
 * - 設定済みでネットワーク／HTTPエラーが起きた場合は呼び出し側へ throw する。
 *   役員会承認前のステージで誤って空配列を出さないため、本番設定下では明示失敗させる。
 */

const WP_API_BASE_URL = process.env.WP_API_BASE_URL?.trim();
const WP_API_USERNAME = process.env.WP_API_USERNAME?.trim();
const WP_API_APP_PASSWORD = process.env.WP_API_APP_PASSWORD?.trim();

export const REVALIDATE_SECONDS = 60;
const REQUEST_TIMEOUT_MS = 8000;

export const isWpConfigured = (): boolean => Boolean(WP_API_BASE_URL);

type CollectionParams = {
  perPage?: number;
  page?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  embed?: boolean;
};

type FetchCollectionResult<T> = {
  items: T[];
  total: number;
  totalPages: number;
};

class WpApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly endpoint?: string,
  ) {
    super(message);
    this.name = "WpApiError";
  }
}

const buildAuthHeader = (): Record<string, string> => {
  if (!WP_API_USERNAME || !WP_API_APP_PASSWORD) return {};
  const token = Buffer.from(`${WP_API_USERNAME}:${WP_API_APP_PASSWORD}`).toString("base64");
  return { Authorization: `Basic ${token}` };
};

const getBase = (endpoint: string): string => {
  if (!WP_API_BASE_URL) {
    throw new WpApiError("WP_API_BASE_URL is not configured", undefined, endpoint);
  }
  return WP_API_BASE_URL.replace(/\/+$/, "");
};

const buildUrl = (endpoint: string, params: CollectionParams): string => {
  const base = getBase(endpoint);
  const search = new URLSearchParams();
  search.set("per_page", String(params.perPage ?? 20));
  if (params.page) search.set("page", String(params.page));
  if (params.orderBy) search.set("orderby", params.orderBy);
  if (params.order) search.set("order", params.order);
  if (params.embed) search.set("_embed", "true");
  return `${base}/${endpoint}?${search.toString()}`;
};

const buildSingleUrl = (endpoint: string, id: number, embed: boolean): string => {
  const base = getBase(endpoint);
  const suffix = embed ? "?_embed=true" : "";
  return `${base}/${endpoint}/${id}${suffix}`;
};

async function fetchCollection<T>(
  endpoint: string,
  params: CollectionParams = {},
): Promise<FetchCollectionResult<T>> {
  const url = buildUrl(endpoint, params);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...buildAuthHeader(),
      },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: controller.signal,
    });

    if (res.status === 404) {
      return { items: [], total: 0, totalPages: 0 };
    }
    if (!res.ok) {
      throw new WpApiError(
        `WP API ${endpoint} responded with HTTP ${res.status}`,
        res.status,
        endpoint,
      );
    }

    const items = (await res.json()) as T[];
    const total = Number(res.headers.get("X-WP-Total") ?? items.length);
    const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);
    return { items, total, totalPages };
  } catch (err) {
    if (err instanceof WpApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new WpApiError(
        `WP API ${endpoint} timed out after ${REQUEST_TIMEOUT_MS}ms`,
        undefined,
        endpoint,
      );
    }
    const message = err instanceof Error ? err.message : String(err);
    throw new WpApiError(`WP API ${endpoint} request failed: ${message}`, undefined, endpoint);
  } finally {
    clearTimeout(timeoutId);
  }
}

const sliceMock = <T>(items: T[], params: CollectionParams): FetchCollectionResult<T> => {
  const perPage = params.perPage ?? 20;
  const page = params.page ?? 1;
  const start = (page - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    total: items.length,
    totalPages: Math.max(1, Math.ceil(items.length / perPage)),
  };
};

async function fetchSingle<T>(endpoint: string, id: number, embed = true): Promise<T | null> {
  const url = buildSingleUrl(endpoint, id, embed);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...buildAuthHeader(),
      },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: controller.signal,
    });

    if (res.status === 404) return null;
    if (!res.ok) {
      throw new WpApiError(
        `WP API ${endpoint}/${id} responded with HTTP ${res.status}`,
        res.status,
        endpoint,
      );
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof WpApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new WpApiError(
        `WP API ${endpoint}/${id} timed out after ${REQUEST_TIMEOUT_MS}ms`,
        undefined,
        endpoint,
      );
    }
    const message = err instanceof Error ? err.message : String(err);
    throw new WpApiError(`WP API ${endpoint}/${id} request failed: ${message}`, undefined, endpoint);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getNews(params: CollectionParams = {}): Promise<WpNews[]> {
  if (!isWpConfigured()) return sliceMock(mockWpNews, params).items;
  const { items } = await fetchCollection<WpNews>("news", { embed: true, ...params });
  return items;
}

/**
 * 単一お知らせ取得。
 * - 404 → null（記事が存在しない、呼び出し側で notFound() 想定）
 * - 5xx / timeout / network → throw（WP障害を可視化）
 * - WP_API_BASE_URL 未設定時も throw（mockData にはフォールバックしない設計）
 */
export async function getNewsById(id: number): Promise<WpNews | null> {
  if (!Number.isFinite(id) || id <= 0) return null;
  return fetchSingle<WpNews>("news", id);
}

export async function getBroadcastArchive(
  params: CollectionParams = {},
): Promise<WpBroadcastArchive[]> {
  if (!isWpConfigured()) return sliceMock(mockWpBroadcastArchive, params).items;
  const { items } = await fetchCollection<WpBroadcastArchive>("broadcast_archive", {
    embed: true,
    ...params,
  });
  return items;
}

export async function getFaqs(params: CollectionParams = {}): Promise<WpFaq[]> {
  if (!isWpConfigured()) return sliceMock(mockWpFaqs, params).items;
  const { items } = await fetchCollection<WpFaq>("faq", {
    orderBy: "date",
    order: "asc",
    ...params,
  });
  return items;
}

export async function getEvents(params: CollectionParams = {}): Promise<WpEvent[]> {
  if (!isWpConfigured()) return sliceMock(mockWpEvents, params).items;
  const { items } = await fetchCollection<WpEvent>("events", { embed: true, ...params });
  return items;
}

/**
 * 単一行事取得。getNewsById と同じエラー方針。
 */
export async function getEventById(id: number): Promise<WpEvent | null> {
  if (!Number.isFinite(id) || id <= 0) return null;
  return fetchSingle<WpEvent>("events", id);
}

export { WpApiError };
