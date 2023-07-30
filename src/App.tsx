import "./App.css";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SupabaseClientContext from "./contexts/SupabaseContext";
import AppRouter from "./AppRouter";

const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session: any) => {
      // REMOVE ME
      console.log(event);
      console.log(session ? "valid session" : "invalid session");
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseClientContext.Provider value={supabase}>
      <AppRouter />
    </SupabaseClientContext.Provider>
  );
}

export default App;
