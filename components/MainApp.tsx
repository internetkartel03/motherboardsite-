'use client';

import { useState } from 'react';
import HomePage from './HomePage';
import FlagshipsPage from './FlagshipsPage';
import BetaPage from './BetaPage';

type PageKey = 'home' | 'flagships' | 'beta';

export default function MainApp() {
  const [page, setPage] = useState<PageKey>('home');

  return (
    <main style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden', background: '#060606' }}>
      {page === 'home' && <HomePage navigate={setPage} />}
      {page === 'flagships' && <FlagshipsPage navigate={setPage} />}
      {page === 'beta' && <BetaPage navigate={setPage} />}
    </main>
  );
}
