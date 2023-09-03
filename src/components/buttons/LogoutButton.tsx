import React from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
type Prop = {
  className: string;
};

const LogoutButton: React.FC<Prop> = ({ className }) => {
  const navigate = useNavigate();
  const supabase: SupabaseClient<any, "public", any> = useSupabaseClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <button className={className} onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
