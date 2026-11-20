import { siteConfig } from '@/config/site';
import { ImageResponse } from 'next/og';

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The image is rendered outside the page, so CSS variables from the tokens are not available.
// These hex values are the light theme tokens: foreground (neutral 950), muted foreground (neutral 500) and primary (red 700).
const colors = { background: '#ffffff', foreground: '#0a0a0a', muted: '#737373', primary: '#b00b1c' };

/** The social share card, generated once at build time. Uses the built-in font, so no font file is needed. */
export default function OpengraphImage() {
    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 80,
                background: colors.background,
                borderTop: `16px solid ${colors.primary}`,
            }}
        >
            <div style={{ fontSize: 36, color: colors.primary, fontWeight: 600 }}>{siteConfig.name}</div>
            <div style={{ marginTop: 24, fontSize: 72, color: colors.foreground, fontWeight: 700, lineHeight: 1.1 }}>
                Accessible components, themed by tokens
            </div>
            <div style={{ marginTop: 32, fontSize: 32, color: colors.muted }}>{siteConfig.description}</div>
        </div>,
        size,
    );
}
