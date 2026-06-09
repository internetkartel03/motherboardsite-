'use client';

import { useEffect, useRef } from 'react';

type VideoBackgroundProps = {
  src: string;
  overlay?: string;
};

export default function VideoBackground({ src, overlay }: VideoBackgroundProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [src]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', background: '#060606' }}>
      <video
        ref={ref}
        key={src}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {overlay && <div style={{ position: 'absolute', inset: 0, background: overlay }} />}
    </div>
  );
}
