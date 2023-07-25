import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleSignOut}>log out</button>
    </div>
  );
};

export default LogoutButton;
