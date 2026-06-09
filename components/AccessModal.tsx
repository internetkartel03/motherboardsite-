'use client';

import { useState, type FormEvent } from 'react';
import { C } from '../lib/theme';

type AccessModalProps = {
  onSubmit: (email: string, name: string) => void;
  onClose: () => void;
};

export default function AccessModal({ onSubmit, onClose }: AccessModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const [hover, setHover] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErr('A valid email is required.');
      return;
    }
    onSubmit(email.trim(), name.trim());
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${C.border}`,
    borderRadius: '2px',
    padding: '13px 16px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    fontWeight: 400,
    color: C.white,
    outline: 'none',
    letterSpacing: '0.04em',
    transition: 'border-color 0.2s',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px', padding: '56px 48px', position: 'relative' }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: C.dimmer,
          marginBottom: '40px',
        }}>
          REQUEST ACCESS
        </p>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErr(''); }}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(242,242,242,0.2)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = C.border; }}
          />
          <input
            type="text"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(242,242,242,0.2)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = C.border; }}
          />

          {err && (
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', color: C.red, letterSpacing: '0.05em' }}>
              {err}
            </p>
          )}

          <button
            type="submit"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              marginTop: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              alignSelf: 'flex-start',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: hover ? C.green : C.white,
              textShadow: hover ? '0 0 20px rgba(0,200,122,0.4)' : 'none',
              transition: 'color 0.25s, text-shadow 0.25s',
            }}
          >
            REQUEST ACCESS →
          </button>
        </form>
      </div>
    </div>
  );
}
