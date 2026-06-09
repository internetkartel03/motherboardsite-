'use client';

import { useState } from 'react';
import { C, textShadow } from '../lib/theme';

type NavProps = {
  page: 'home' | 'flagships' | 'beta';
  navigate: (target: 'home' | 'flagships' | 'beta') => void;
};

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: active ? C.white : hovered ? C.white : C.dim,
        textShadow,
        transition: 'color 0.25s',
      }}
    >
      {label}
    </button>
  );
}

export default function Nav({ page, navigate }: NavProps) {
  return (
    <nav
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'clamp(16px,3.5vw,28px) clamp(16px,4vw,40px)',
      }}
    >
      <NavLink label="FLAGSHIPS" active={page === 'flagships'} onClick={() => navigate('flagships')} />
      <NavLink label="BETA ACCESS" active={page === 'beta'} onClick={() => navigate('beta')} />
    </nav>
  );
}
