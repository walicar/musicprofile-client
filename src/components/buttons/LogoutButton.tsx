import React from "react";
import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
const supabase = createClient(PROJECT_URL!, PUB_KEY!);

const LogoutButton: React.FC = () => {
  return (
    <div>
      <button onClick={() => supabase.auth.signOut()}>log out</button>
    </div>
  );
};

export default LogoutButton;