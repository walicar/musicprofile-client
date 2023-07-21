import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session: any) => {
      // REMOVE ME
      console.log(event)
      setSession(session);
    });

    // REMOVE ME
    if (!session) {
        console.log("Not signed in")
      } else {
        console.log("signed in: ", session);
      }

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage content={"this is home page content"} />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
