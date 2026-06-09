'use client';

import { useState, useEffect, useRef, useCallback, type MouseEvent, type TouchEvent } from 'react';
import VideoBackground from './VideoBackground';
import Nav from './Nav';
import { METALLIC } from '../lib/metallic';
import { C } from '../lib/theme';

type Flagship = (typeof METALLIC.flagships)[number];

type FlagshipsPageProps = {
  navigate: (target: 'home' | 'flagships' | 'beta') => void;
};

function FlagshipCard({ f, active, onClick }: { f: Flagship; active: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: '70vw',
        maxWidth: '820px',
        height: 'clamp(340px, 60vh, 640px)',
        background: `linear-gradient(160deg, rgba(22,22,22,0.98) 0%, rgba(10,10,10,0.99) 100%), ${f.accent}`,
        backgroundColor: '#111',
        border: `1px solid ${hov || active ? 'rgba(242,242,242,0.12)' : 'rgba(242,242,242,0.05)'}`,
        borderRadius: '2px',
        padding: '48px 52px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s',
        transform: active ? 'scale(1)' : 'scale(0.97)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
      }}
    >
      <span style={{
        position: 'absolute',
        right: '-12px',
        bottom: '-40px',
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(120px, 18vw, 220px)',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.025)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {f.num}
      </span>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: f.available ? C.green : C.dimmer,
          border: `1px solid ${f.available ? 'rgba(0,200,122,0.25)' : 'rgba(242,242,242,0.1)'}`,
          padding: '5px 10px',
          borderRadius: '1px',
        }}>
          {f.status}
        </span>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          color: 'rgba(242,242,242,0.18)',
        }}>
          {f.num}
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '32px' }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: C.dimmer,
          marginBottom: '16px',
        }}>
          {f.category}
        </p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(24px, 3.5vw, 48px)',
          fontWeight: 800,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: C.white,
          lineHeight: 1.05,
          whiteSpace: 'pre-line',
          marginBottom: '24px',
        }}>
          {f.name}
        </h2>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: 1.75,
          color: 'rgba(242,242,242,0.5)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {f.description}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '24px' }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: f.available ? C.green : 'rgba(242,242,242,0.25)',
        }}>
          {f.action} →
        </span>
      </div>
    </div>
  );
}

function FlagshipFullscreen({ f, onBack }: { f: Flagship; onBack: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 20);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(4,4,4,0.97)', opacity: mounted ? 1 : 0, transition: 'opacity 0.35s', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 40px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.dimmer,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.white; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.dimmer; }}
        >
          ← BACK
        </button>

        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: f.available ? C.green : C.dimmer,
          border: `1px solid ${f.available ? 'rgba(0,200,122,0.25)' : 'rgba(242,242,242,0.1)'}`,
          padding: '5px 10px',
          borderRadius: '1px',
        }}>
          {f.status}
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 clamp(40px,8vw,120px)' }}>
        <div style={{ maxWidth: '680px' }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: C.dimmer,
            marginBottom: '20px',
          }}>
            {f.category}
          </p>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(36px,6vw,88px)',
            fontWeight: 800,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            color: C.white,
            lineHeight: 1.0,
            whiteSpace: 'pre-line',
            marginBottom: '36px',
          }}>
            {f.name}
          </h1>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(14px,1.5vw,17px)',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'rgba(242,242,242,0.55)',
          }}>
            {f.description}
          </p>
        </div>
      </div>

      <div style={{ padding: '28px 40px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            background: 'none',
            border: 'none',
            cursor: f.available ? 'pointer' : 'default',
            padding: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: hov && f.available ? C.green : (f.available ? C.white : 'rgba(242,242,242,0.25)'),
            transition: 'color 0.25s',
          }}
        >
          {f.action} {f.available ? '→' : ''}
        </button>
      </div>
    </div>
  );
}

export default function FlagshipsPage({ navigate }: FlagshipsPageProps) {
  const flagships = METALLIC.flagships;
  const [idx, setIdx] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<Flagship | null>(null);
  const [titleVis, setTitleVis] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setTitleVis(true), 80);
    return () => window.clearTimeout(timeout);
  }, []);

  const CARD_VW = 0.7;
  const GAP = 24;

  const getOffset = useCallback((i: number, delta = 0) => {
    const W = containerRef.current?.offsetWidth || window.innerWidth;
    const cardW = W * CARD_VW;
    const side = (W - cardW) / 2;
    return side - i * (cardW + GAP) + delta;
  }, []);

  const goTo = (i: number) => setIdx(Math.max(0, Math.min(flagships.length - 1, i)));

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragStart(event.clientX);
    setDragging(true);
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || dragStart === null) return;
    setDragDelta(event.clientX - dragStart);
  };

  const onMouseUp = () => {
    if (dragging) {
      if (dragDelta < -60) goTo(idx + 1);
      else if (dragDelta > 60) goTo(idx - 1);
    }
    setDragging(false);
    setDragDelta(0);
    setDragStart(null);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setDragStart(event.touches[0].clientX);
    setDragging(true);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!dragging || dragStart === null) return;
    setDragDelta(event.touches[0].clientX - dragStart);
  };

  const onTouchEnd = () => {
    if (dragging) {
      if (dragDelta < -60) goTo(idx + 1);
      else if (dragDelta > 60) goTo(idx - 1);
    }
    setDragging(false);
    setDragDelta(0);
    setDragStart(null);
  };

  const translateX = getOffset(idx, dragging ? dragDelta : 0);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <VideoBackground src="/uploads/first_page_under_20mb.mp4" />
      <Nav page="flagships" navigate={navigate} />

      <div style={{
        position: 'absolute',
        top: 'clamp(70px,10vh,120px)',
        left: 'clamp(16px,4vw,40px)',
        zIndex: 5,
        opacity: titleVis ? 1 : 0,
        transform: titleVis ? 'none' : 'translateY(8px)',
        transition: 'opacity 0.5s, transform 0.5s',
      }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(28px,3vw,40px)',
          fontWeight: 800,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: C.white,
          textShadow: '0 0 40px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.85)',
          lineHeight: 1,
          marginBottom: '10px',
        }}>
          FLAGSHIPS
        </h1>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '12px',
          fontWeight: 300,
          letterSpacing: '0.08em',
          color: C.dim,
          textShadow: '0 0 40px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.85)',
        }}>
          Core products of the Metallic.V1 ecosystem.
        </p>
      </div>

      <div
        ref={containerRef}
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', overflow: 'hidden' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div style={{
          display: 'flex',
          gap: `${GAP}px`,
          transform: `translateX(${translateX}px)`,
          transition: dragging ? 'none' : 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
          willChange: 'transform',
        }}>
          {flagships.map((f, i) => (
            <FlagshipCard
              key={f.id}
              f={f}
              active={i === idx}
              onClick={() => {
                if (Math.abs(dragDelta) < 10) {
                  if (i === idx) setSelected(f);
                  else goTo(i);
                }
              }}
            />
          ))}
        </div>
      </div>

      {idx > 0 && (
        <button
          onClick={() => goTo(idx - 1)}
          style={{
            position: 'absolute',
            left: 'clamp(6px,2vw,16px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 6,
            background: 'rgba(10,10,10,0.55)',
            border: `1px solid ${C.border}`,
            borderRadius: '50%',
            width: 'clamp(36px,5vw,44px)',
            height: 'clamp(36px,5vw,44px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.dim,
            fontSize: '16px',
            backdropFilter: 'blur(4px)',
            transition: 'color 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.white; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.dim; }}
        >
          ←
        </button>
      )}
      {idx < flagships.length - 1 && (
        <button
          onClick={() => goTo(idx + 1)}
          style={{
            position: 'absolute',
            right: 'clamp(6px,2vw,16px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 6,
            background: 'rgba(10,10,10,0.55)',
            border: `1px solid ${C.border}`,
            borderRadius: '50%',
            width: 'clamp(36px,5vw,44px)',
            height: 'clamp(36px,5vw,44px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: C.dim,
            fontSize: '16px',
            backdropFilter: 'blur(4px)',
            transition: 'color 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.white; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.dim; }}
        >
          →
        </button>
      )}

      <div style={{ position: 'absolute', bottom: '28px', left: 0, right: 0, zIndex: 5, display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {flagships.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === idx ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === idx ? C.white : 'rgba(242,242,242,0.25)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {selected && <FlagshipFullscreen f={selected} onBack={() => setSelected(null)} />}
    </div>
  );
}
