// Page 1 — Home
const { useState, useEffect } = React;

/* ── COUNTDOWN ───────────────────────────────────────────── */
function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = window.METALLIC.betaDate - Date.now();
      if (diff <= 0) { setT({ d:0,h:0,m:0,s:0 }); return; }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = n => String(n).padStart(2, '0');
  const units = [
    [pad(t.d), 'DAYS'],
    [pad(t.h), 'HOURS'],
    [pad(t.m), 'MINUTES'],
    [pad(t.s), 'SECONDS'],
  ];

  return (
    <div style={{ textAlign:'center', userSelect:'none', pointerEvents:'none' }}>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '9px', fontWeight: 500,
        letterSpacing: '0.35em', textTransform: 'uppercase',
        color: 'rgba(242,242,242,0.5)',
        textShadow: window.textShadow,
        marginBottom: '20px',
      }}>BETA ACCESS OPENS IN</p>

      <div style={{ display:'flex', gap:'clamp(12px,3vw,32px)', alignItems:'flex-end', justifyContent:'center' }}>
        {units.map(([val, unit]) => (
          <div key={unit} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 700,
              color: window.C.white,
              textShadow: window.glowShadow,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>{val}</span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '8px', fontWeight: 500,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(242,242,242,0.38)',
              textShadow: window.textShadow,
            }}>{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── HOME PAGE ───────────────────────────────────────────── */
function HomePage({ navigate }) {
  const [workshopHover, setWorkshopHover] = useState(false);

  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <VideoBackground src="../uploads/first_page_under_20mb.mp4" />

      {/* NAV */}
      <Nav page="home" navigate={navigate} />

      {/* COUNTDOWN — upper center */}
      <div style={{
        position:'absolute', top:'clamp(80px, 12vh, 130px)',
        left:0, right:0, zIndex:5,
        display:'flex', justifyContent:'center',
      }}>
        <Countdown />
      </div>

      {/* BOTTOM LEFT — brand */}
      <div style={{
        position:'absolute', bottom:'clamp(20px,4vh,48px)', left:'clamp(16px,4vw,40px)', zIndex:5,
        userSelect:'none', pointerEvents:'none',
        maxWidth:'55vw',
      }}>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(20px, 2.4vw, 32px)',
          fontWeight: 800, letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: window.C.white,
          textShadow: window.textShadow,
          lineHeight: 1,
          marginBottom: '10px',
        }}>METALLIC.V1</p>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '12px', fontWeight: 300,
          letterSpacing: '0.06em',
          color: window.C.dim,
          textShadow: window.textShadow,
          maxWidth: 'min(320px, 42vw)',
          lineHeight: 1.6,
        }}>Private ecosystem of AI systems,<br/>automation tools, and flagship products.</p>
      </div>

      {/* BOTTOM RIGHT — cta */}
      <div style={{
        position:'absolute', bottom:'clamp(20px,4vh,48px)', right:'clamp(16px,4vw,40px)', zIndex:5,
      }}>
        <button
          onClick={() => navigate('flagships')}
          onMouseEnter={() => setWorkshopHover(true)}
          onMouseLeave={() => setWorkshopHover(false)}
          style={{
            background:'none', border:'none', cursor:'pointer', padding:0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: workshopHover ? window.C.green : window.C.white,
            textShadow: workshopHover
              ? `0 0 24px rgba(0,200,122,0.5), ${window.textShadow}`
              : window.textShadow,
            transition: 'color 0.3s, text-shadow 0.3s',
          }}
        >
          ACCESS WORKSHOP →
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage });
