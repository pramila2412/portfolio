import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
          borderRadius: '50%',
          color: 'white',
          fontSize: 40,
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        P
      </div>
    ),
    { ...size }
  );
}
