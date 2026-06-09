// App — orchestrates pages, transitions, access gate
const { useState, useEffect, useCallback } = React;

function App() {
  const [page, setPage]           = useState('home');
  const [opacity, setOpacity]     = useState(1);
  const [transitioning, setTrans] = useState(false);
  const [accessGranted, setAccess]= useState(
    () => sessionStorage.getItem('mv1_access') === 'true'
  );
  const [showModal, setShowModal] = useState(false);
  const [pendingPage, setPending] = useState(null);

  const fadeTo = useCallback((target) => {
    if (transitioning || target === page) return;
    setTrans(true);
    setOpacity(0);
    setTimeout(() => {
      setPage(target);
      setOpacity(1);
      setTrans(false);
    }, 380);
  }, [page, transitioning]);

  const navigate = useCallback((target) => {
    if (target === 'home') { fadeTo('home'); return; }
    if (accessGranted) { fadeTo(target); return; }
    setPending(target);
    setShowModal(true);
  }, [accessGranted, fadeTo]);

  const onAccessSubmit = (email, name) => {
    sessionStorage.setItem('mv1_access', 'true');
    sessionStorage.setItem('mv1_email', email);
    if (name) sessionStorage.setItem('mv1_name', name);
    setAccess(true);
    setShowModal(false);
    if (pendingPage) fadeTo(pendingPage);
  };

  const pageStyle = {
    position:'absolute', inset:0,
    opacity, transition: 'opacity 0.38s ease',
  };

  return (
    <div style={{ width:'100%', height:'100%', background:'#060606', position:'relative', overflow:'hidden' }}>
      <div style={pageStyle}>
        {page === 'home'      && <HomePage     navigate={navigate} />}
        {page === 'flagships' && <FlagshipsPage navigate={navigate} />}
        {page === 'beta'      && <BetaPage      navigate={navigate} />}
      </div>

      {showModal && (
        <AccessModal
          onSubmit={onAccessSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
