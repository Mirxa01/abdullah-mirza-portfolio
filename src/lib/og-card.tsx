/**
 * Shared Open Graph / Twitter social card renderer.
 *
 * Produces a 1200×630 branded card via `next/og` (Satori). Used by both
 * `app/opengraph-image.tsx` and `app/twitter-image.tsx` so the social preview
 * is generated at request time — no static image asset to keep in sync.
 */
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = "Abdullah Mirza — Founder · Builder · Operator";

export function renderOgCard(): ImageResponse {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "radial-gradient(1200px 600px at 80% -10%, #0a2a5e 0%, #050505 55%)",
                padding: "72px 80px",
                fontFamily: "sans-serif",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                    style={{
                        width: 18,
                        height: 18,
                        borderRadius: 9999,
                        background: "#0066ff",
                        boxShadow: "0 0 24px #0066ff",
                    }}
                />
                <span
                    style={{
                        color: "#9bb4ff",
                        fontSize: 24,
                        letterSpacing: 6,
                        textTransform: "uppercase",
                        fontWeight: 600,
                    }}
                >
                    Founder · Builder · Operator
                </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <span style={{ color: "#ffffff", fontSize: 92, fontWeight: 800, lineHeight: 1.02 }}>
                    Abdullah Mirza
                </span>
                <span style={{ color: "#c8d2e0", fontSize: 40, fontWeight: 500, maxWidth: 980 }}>
                    Software people enjoy — apps, AI &amp; ops from Riyadh
                </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#8a96a8", fontSize: 28 }}>Riyadh, Saudi Arabia</span>
                <span style={{ color: "#ffffff", fontSize: 28, fontWeight: 600 }}>abdullahmirza.com</span>
            </div>
        </div>,
        { ...OG_SIZE },
    );
}
