import React from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { clearLocalStorage } from "@utils/localStorage";
type Prop = {
  className: string;
  onClick?: () => void
};

const LogoutButton: React.FC<Prop> = ({ className, onClick }) => {
  const navigate = useNavigate();
  const supabase: SupabaseClient<any, "public", any> = useSupabaseClient();
  const handleLogout = async () => {
    if (onClick) onClick();
    await supabase.auth.signOut();
    clearLocalStorage();
    navigate("/");
  };

  return (
    <button className={className} onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
