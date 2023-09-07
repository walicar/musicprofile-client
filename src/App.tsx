import "./App.css";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createClient } from "@supabase/supabase-js";
import { HelmetProvider } from "react-helmet-async";
import SupabaseClientContext from "@contexts/SupabaseContext";
import AppRouter from "./AppRouter";
import useLocalStorageState from "use-local-storage-state";

const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const PUB_KEY = import.meta.env.VITE_SUPABASE_PUB;
const ID = import.meta.env.VITE_SUPABASE_ID;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);
const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useLocalStorageState(`sb-${ID}-auth-token`);
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session: any) => {
      console.log(event);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession, session]);
  return (
    <SupabaseClientContext.Provider value={supabase}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AppRouter />
        </HelmetProvider>
      </QueryClientProvider>
    </SupabaseClientContext.Provider>
  );
}

export default App;
