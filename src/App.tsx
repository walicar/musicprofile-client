import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createClient } from "@supabase/supabase-js";
import SupabaseClientContext from "./contexts/SupabaseContext";
import AppRouter from "./AppRouter";

const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const PUB_KEY = import.meta.env.VITE_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

const queryClient = new QueryClient();

function App() {

  return (
    <SupabaseClientContext.Provider value={supabase}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </SupabaseClientContext.Provider>
  );
}

export default App;
