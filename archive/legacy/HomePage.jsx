// Page 3 — Beta Access Hub
const { useState, useEffect } = React;

/* ── TILE ────────────────────────────────────────────────── */
function Tile({ children, style }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(18,18,18,0.88)' : 'rgba(10,10,10,0.75)',
        border: `1px solid ${hov ? 'rgba(242,242,242,0.11)' : 'rgba(242,242,242,0.06)'}`,
        borderRadius: '2px',
        padding: '28px 28px 24px',
        backdropFilter: 'blur(12px)',
        transition: 'background 0.25s, border-color 0.25s',
        ...style,
      }}
    >{children}</div>
  );
}

function TileLabel({ children }) {
  return (
    <p style={{
      fontFamily:"'Space Grotesk',sans-serif",
      fontSize:'9px', fontWeight:500,
      letterSpacing:'0.3em', textTransform:'uppercase',
      color:'rgba(242,242,242,0.3)', marginBottom:'16px',
    }}>{children}</p>
  );
}

function TileAction({ label, onClick, green }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:'none', border:'none', cursor:'pointer', padding:0,
        fontFamily:"'Space Grotesk',sans-serif",
        fontSize:'10px', fontWeight:600,
        letterSpacing:'0.25em', textTransform:'uppercase',
        color: hov ? window.C.green : (green ? window.C.green : 'rgba(242,242,242,0.45)'),
        transition:'color 0.22s',
        marginTop:'20px', display:'block',
      }}
    >{label} →</button>
  );
}

/* ── STATUS DOT ──────────────────────────────────────────── */
function StatusRow({ label, status, online }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
      <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'12px', fontWeight:300, color:'rgba(242,242,242,0.5)' }}>{label}</span>
      <span style={{
        fontFamily:"'Space Mono',monospace", fontSize:'9px', fontWeight:700,
        letterSpacing:'0.18em', textTransform:'uppercase',
        color: online === true ? window.C.green : online === 'prep' ? '#D4A017' : 'rgba(242,242,242,0.35)',
      }}>{status}</span>
    </div>
  );
}

/* ── MINI MODAL ──────────────────────────────────────────── */
function MiniModal({ title, children, onClose }) {
  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:'fixed', inset:0, zIndex:50,
        background:'rgba(0,0,0,0.75)', backdropFilter:'blur(8px)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}
    >
      <div style={{
        width:'100%', maxWidth:'400px',
        background:'rgba(14,14,14,0.98)',
        border:'1px solid rgba(242,242,242,0.08)',
        borderRadius:'2px', padding:'40px',
        position:'relative',
      }}>
        <button onClick={onClose} style={{
          position:'absolute', top:'16px', right:'16px',
          background:'none', border:'none', cursor:'pointer',
          fontFamily:"'Space Mono',monospace", fontSize:'11px',
          color:'rgba(242,242,242,0.3)', padding:'4px 8px',
        }}>✕</button>
        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'9px', fontWeight:500,
          letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(242,242,242,0.3)', marginBottom:'28px',
        }}>{title}</p>
        {children}
      </div>
    </div>
  );
}

/* ── INPUT ───────────────────────────────────────────────── */
function MinInput({ placeholder, value, onChange, type='text' }) {
  return (
    <input
      type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{
        width:'100%', background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(242,242,242,0.07)', borderRadius:'2px',
        padding:'11px 14px', marginBottom:'10px',
        fontFamily:"'Space Grotesk',sans-serif", fontSize:'13px', fontWeight:400,
        color:'#F2F2F2', outline:'none', letterSpacing:'0.03em',
      }}
      onFocus={e => e.target.style.borderColor='rgba(242,242,242,0.2)'}
      onBlur={e  => e.target.style.borderColor='rgba(242,242,242,0.07)'}
    />
  );
}

/* ── BETA PAGE ───────────────────────────────────────────── */
function BetaPage({ navigate, openAccessModal }) {
  const [contributors]    = useState(window.METALLIC.getContributors());
  const [modal, setModal] = useState(null);  // 'contribute' | 'updates' | 'contact' | 'access' | 'done'
  const [doneMsg, setDoneMsg] = useState('');

  // Waitlist form
  const [wlName,  setWlName]  = useState('');
  const [wlEmail, setWlEmail] = useState('');
  const [wlDone,  setWlDone]  = useState(false);

  // Contact / access request form
  const [cName,  setCName]  = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cMsg,   setCMsg]   = useState('');

  const showDone = (msg) => { setDoneMsg(msg); setModal('done'); };

  const bodyText = { fontFamily:"'Space Grotesk',sans-serif", fontSize:'13px', fontWeight:300, lineHeight:1.7, color:'rgba(242,242,242,0.55)' };
  const bigText  = { fontFamily:"'Syne',sans-serif", fontSize:'clamp(18px,2vw,26px)', fontWeight:700, color:'#F2F2F2', letterSpacing:'0.03em', marginBottom:'12px' };

  return (
    <div style={{ position:'relative', width:'100%', height:'100%', overflow:'hidden' }}>
      {/* VIDEO — locked to viewport, never scrolls */}
      <VideoBackground src="../uploads/lastpage_under_20mb.mp4" overlay="rgba(0,0,0,0.28)" />
      {/* NAV — above scroll layer */}
      <Nav page="beta" navigate={navigate} />

      {/* SCROLLABLE CONTENT — floats over static video */}
      <div className="scroll-layer" style={{
        position:'absolute', inset:0, zIndex:5,
        overflowY:'auto', overflowX:'hidden',
      }}>

      {/* CONTRIBUTOR COUNT */}
      <div style={{
        textAlign:'center',
        paddingTop:'clamp(80px,12vh,130px)',
        paddingBottom:'clamp(28px,5vh,56px)',
        pointerEvents:'none',
      }}>
        <p style={{
          fontFamily:"'Syne',sans-serif",
          fontSize:'clamp(48px,7vw,96px)', fontWeight:800,
          letterSpacing:'-0.02em', color:'#F2F2F2',
          textShadow: window.glowShadow, lineHeight:1,
          marginBottom:'14px',
        }}>{contributors}</p>
        <p style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:'10px', fontWeight:400,
          letterSpacing:'0.3em', textTransform:'uppercase',
          color:'rgba(242,242,242,0.4)', textShadow: window.textShadow,
        }}>CONTRIBUTORS</p>
        <p style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontSize:'13px', fontWeight:300, letterSpacing:'0.06em',
          color:'rgba(242,242,242,0.35)', marginTop:'12px',
          textShadow: window.textShadow,
        }}>Building the future of Metallic.V1</p>
      </div>

      {/* TILES GRID */}
      <div className="beta-grid" style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))',
        gap:'16px',
        maxWidth:'900px',
        margin:'0 auto',
        padding:'0 clamp(16px,4vw,24px) clamp(48px,8vh,80px)',
      }}>

        {/* TILE 1 — FOUNDING CONTRIBUTOR */}
        <Tile>
          <TileLabel>Founding Contributor</TileLabel>
          <p style={bigText}>$40 <span style={{ fontSize:'14px', fontWeight:300, color:'rgba(242,242,242,0.4)' }}>+</span></p>
          <p style={bodyText}>Receive ZOUK Skills &amp; Agents Kit, Founding Contributor Status, and Founder Badge.</p>
          <TileAction label="CONTRIBUTE" onClick={() => setModal('contribute')} green />
        </Tile>

        {/* TILE 2 — WAITLIST */}
        <Tile>
          <TileLabel>Waitlist</TileLabel>
          {wlDone ? (
            <p style={{ ...bodyText, color: window.C.green, fontSize:'12px', letterSpacing:'0.05em' }}>You're on the list. We'll be in touch.</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (wlEmail) setWlDone(true); }}>
              <MinInput placeholder="Name" value={wlName} onChange={e => setWlName(e.target.value)} />
              <MinInput placeholder="Email address" value={wlEmail} onChange={e => setWlEmail(e.target.value)} type="email" />
              <button type="submit" style={{
                background:'none', border:'none', cursor:'pointer', padding:0,
                fontFamily:"'Space Grotesk',sans-serif", fontSize:'10px', fontWeight:600,
                letterSpacing:'0.25em', textTransform:'uppercase',
                color:'rgba(242,242,242,0.45)', marginTop:'12px', display:'block',
                transition:'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = window.C.green}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,242,242,0.45)'}
              >JOIN WAITLIST →</button>
            </form>
          )}
        </Tile>

        {/* TILE 3 — DEVELOPMENT STATUS */}
        <Tile>
          <TileLabel>Development Status</TileLabel>
          <StatusRow label="Core Systems"     status="ONLINE"    online={true} />
          <StatusRow label="Private Beta"     status="PREPARING" online="prep" />
          <StatusRow label="Contributor Access" status="OPEN"   online={true} />
        </Tile>

        {/* TILE 4 — FUTURE UPDATES */}
        <Tile>
          <TileLabel>Future Updates</TileLabel>
          <p style={bodyText}>Latest project progress and upcoming releases.</p>
          <TileAction label="VIEW UPDATES" onClick={() => setModal('updates')} />
        </Tile>

        {/* TILE 5 — ACCESS REQUEST */}
        <Tile>
          <TileLabel>Access Request</TileLabel>
          <p style={bodyText}>Request testing access, partnership opportunities, or early evaluation.</p>
          <TileAction label="REQUEST ACCESS" onClick={() => setModal('access')} />
        </Tile>

        {/* TILE 6 — CONTACT */}
        <Tile>
          <TileLabel>Contact</TileLabel>
          <p style={bodyText}>General inquiries and partnerships.</p>
          <TileAction label="CONTACT" onClick={() => setModal('contact')} />
        </Tile>

      </div>
      </div>{/* end scroll layer */}

      {/* ── MODALS (position:fixed — escape scroll layer) ── */}

      {modal === 'contribute' && (
        <MiniModal title="Founding Contributor" onClose={() => setModal(null)}>
          <p style={bigText}>$40+</p>
          <p style={{ ...bodyText, marginBottom:'20px' }}>One-time contribution. Receive the ZOUK Skills &amp; Agents Kit, Founding Contributor status, and a permanent Founder Badge on your profile.</p>
          <TileAction label="SECURE YOUR SPOT" green onClick={() => showDone('Contribution portal launching soon. You will be notified.')} />
        </MiniModal>
      )}

      {modal === 'updates' && (
        <MiniModal title="Future Updates" onClose={() => setModal(null)}>
          {[
            ['ZOUK v1 architecture complete','Systems build phase underway.'],
            ['Contributor access opens','Rolling invitations begin Q3.'],
            ['Private beta launch','First flagships entering closed beta.'],
          ].map(([t,d],i) => (
            <div key={i} style={{ marginBottom:'20px', paddingBottom:'20px', borderBottom: i < 2 ? '1px solid rgba(242,242,242,0.05)' : 'none' }}>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:'12px', fontWeight:500, color:'#F2F2F2', marginBottom:'4px' }}>{t}</p>
              <p style={{ ...bodyText, fontSize:'12px' }}>{d}</p>
            </div>
          ))}
        </MiniModal>
      )}

      {(modal === 'access' || modal === 'contact') && (
        <MiniModal title={modal === 'access' ? 'Access Request' : 'Contact'} onClose={() => setModal(null)}>
          <MinInput placeholder="Name" value={cName} onChange={e => setCName(e.target.value)} />
          <MinInput placeholder="Email address" value={cEmail} onChange={e => setCEmail(e.target.value)} type="email" />
          <textarea
            placeholder={modal === 'access' ? 'Describe your use case...' : 'Your message...'}
            value={cMsg} onChange={e => setCMsg(e.target.value)}
            style={{
              width:'100%', minHeight:'90px', background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(242,242,242,0.07)', borderRadius:'2px',
              padding:'11px 14px',
              fontFamily:"'Space Grotesk',sans-serif", fontSize:'13px', fontWeight:300,
              color:'#F2F2F2', outline:'none', resize:'vertical', letterSpacing:'0.03em',
            }}
            onFocus={e => e.target.style.borderColor='rgba(242,242,242,0.2)'}
            onBlur={e  => e.target.style.borderColor='rgba(242,242,242,0.07)'}
          />
          <TileAction label="SEND" green onClick={() => { if (cEmail) showDone('Message received. We will be in touch.'); }} />
        </MiniModal>
      )}

      {modal === 'done' && (
        <MiniModal title="Received" onClose={() => setModal(null)}>
          <p style={{ ...bodyText, color: window.C.green }}>{doneMsg}</p>
        </MiniModal>
      )}
    </div>
  );
}

Object.assign(window, { BetaPage });
