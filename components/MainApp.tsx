'use client';

import { useState, useEffect, useCallback } from 'react';
import HomePage from './HomePage';
import FlagshipsPage from './FlagshipsPage';
import BetaPage from './BetaPage';
import AccessModal from './AccessModal';

type PageKey = 'home' | 'flagships' | 'beta';

const ACCESS_KEY = 'metallic_access';

export default function MainApp() {
  const [page, setPage] = useState<PageKey>('home');
  const [hasAccess, setHasAccess] = useState(false);
  const [pending, setPending] = useState<PageKey | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(ACCESS_KEY)) setHasAccess(true);
    } catch {
      // ignore storage access errors
    }
  }, []);

  const navigate = useCallback(
    (target: PageKey) => {
      if (target === 'home') {
        setPage('home');
        return;
      }
      if (hasAccess) {
        setPage(target);
        return;
      }
      setPending(target);
    },
    [hasAccess],
  );

  const grantAccess = (email: string, name: string) => {
    try {
      localStorage.setItem(ACCESS_KEY, JSON.stringify({ email, name, at: Date.now() }));
    } catch {
      // ignore storage access errors
    }
    setHasAccess(true);
    if (pending) setPage(pending);
    setPending(null);
  };

  return (
    <main style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden', background: '#060606' }}>
      {page === 'home' && <HomePage navigate={navigate} />}
      {page === 'flagships' && <FlagshipsPage navigate={navigate} />}
      {page === 'beta' && <BetaPage navigate={navigate} />}

      {pending && <AccessModal onSubmit={grantAccess} onClose={() => setPending(null)} />}
    </main>
  );
}
