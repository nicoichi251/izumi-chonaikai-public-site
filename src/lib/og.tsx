import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "発寒泉町内会 - 水と緑の街";

const FONT_TEXT =
  "発寒泉町内会水と緑の街札幌市西区Hassamu Izumi Chonaikai";

/**
 * Google Fonts API の text パラメータでサブセット限定の woff2 を取得。
 * 取得失敗時は null を返し呼び出し側でフォントなしフォールバックする。
 */
async function loadNotoSansJp(): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&text=${encodeURIComponent(FONT_TEXT)}`;
    const css = await fetch(cssUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      // ビルド時に走るのでキャッシュは長めに
      cache: "force-cache",
    }).then((r) => r.text());
    const match = css.match(/url\((https:\/\/[^)]+\.woff2)\)/);
    if (!match) return null;
    return await fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

/**
 * 発寒泉町内会のブランド OGP 画像を生成する。
 * opengraph-image.tsx と twitter-image.tsx の両方から呼ばれる共通実装。
 */
export async function generateBrandOgImage() {
  const fontData = await loadNotoSansJp();
  const fontFamily = fontData ? "Noto Sans JP" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #FDFCF9 0%, #E9E6DC 60%, #c9d4c5 100%)",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div
            style={{
              width: 160,
              height: 160,
              background: "#2D5A27",
              borderRadius: 36,
              boxShadow: "0 20px 40px rgba(31, 63, 27, 0.35)",
              color: "#ffffff",
              fontSize: 110,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            泉
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#4A7A44",
                letterSpacing: 6,
              }}
            >
              HASSAMU-IZUMI
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#1F3F1B",
                letterSpacing: 8,
                opacity: 0.7,
              }}
            >
              CHONAIKAI / SAPPORO NISHI-KU
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "#1F3F1B",
              lineHeight: 1.1,
            }}
          >
            発寒泉町内会
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: "#2D5A27",
              opacity: 0.85,
            }}
          >
            水と緑の街・札幌市西区
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 22,
            fontWeight: 900,
            color: "#2D5A27",
            letterSpacing: 4,
            opacity: 0.6,
          }}
        >
          hassamu-izumi.vercel.app
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fontData
        ? [
            {
              name: "Noto Sans JP",
              data: fontData,
              weight: 900,
              style: "normal",
            },
          ]
        : undefined,
    },
  );
}
