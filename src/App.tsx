import "./App.css";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import StubPage from "./pages/StubPage";
import NotFoundPage from "./pages/NotFoundPage";
import RouteGuard from "./components/RouteGuard";

const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    /* No need to use here
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (!session) {
        console.log("Not signed in")
      } else {
        console.log("signed in: ", session);
      }
      setSession(session);
    });
    */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session: any) => {
      // REMOVE ME
      console.log("auth changed");
      console.log(event);
      console.log(session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage content={"this is home page content"} />}
        />
        <Route
          path="/dashboard"
          element={
            <RouteGuard>
              <DashboardPage />
            </RouteGuard>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/stub"
          element={
            <RouteGuard>
              <StubPage />
            </RouteGuard>
          }
        />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
