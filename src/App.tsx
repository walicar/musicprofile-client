import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createClient } from "@supabase/supabase-js";
import SupabaseClientContext from "./contexts/SupabaseContext";
import AppRouter from "./AppRouter";

const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

const queryClient = new QueryClient();

function App() {
  /*
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session: any) => {
      console.log(event);
      console.log(session ? "valid session" : "invalid session");
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession, session]);
  */

  return (
    <SupabaseClientContext.Provider value={supabase}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </SupabaseClientContext.Provider>
  );
}

export default App;
