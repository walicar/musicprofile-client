import React from 'react';
import AppRouter from './AppRouter';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <AppRouter />
    </CookiesProvider>
  );
}

export default App;
