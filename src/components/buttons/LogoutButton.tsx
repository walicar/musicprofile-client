import React from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "../../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const supabase: SupabaseClient<any, "public", any> = useSupabaseClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleSignOut}>log out</button>
    </div>
  );
};

export default LogoutButton;
