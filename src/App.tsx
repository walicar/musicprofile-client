import React from "react";
import AppRouter from "./AppRouter";
import { CookiesProvider } from "react-cookie";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/PageLoader";

function App() {
  const {isLoading} = useAuth0()
  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <CookiesProvider>
      <AppRouter />
    </CookiesProvider>
  );
}

export default App;
