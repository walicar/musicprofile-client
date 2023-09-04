import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useSession() {
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const supabase: SupabaseClient<any> = useSupabaseClient();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        if (!session) navigate("/login")
      })
  }, []);

  return session;
}   
