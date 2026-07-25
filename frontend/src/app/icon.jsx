import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
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
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #38bdf8 0%, #f97316 55%, #db2777 100%)',
          padding: '3px',
        }}
      >
        {/* Inner white circle (donut hole) */}
        <div
          style={{
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
