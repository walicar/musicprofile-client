import React from "react";
import useLocalStorageState from "use-local-storage-state";
import { useSupabaseClient } from "../../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { TokenManager } from "../../database/TokenManager";

const ID = process.env.REACT_APP_SUPABASE_ID;
const StubButton: React.FC = () => {
  const [session, setSession]: any = useLocalStorageState(
    `sb-${ID}-auth-token`,
  );
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const tokenManager: TokenManager = new TokenManager(
    supabase,
    session.user.id,
  );

  const click = async () => {
    console.log("hi");
    await tokenManager.getTokens();
  };

  const otherClick = async () => {
    if (session) {
      const token = { spotify: "hello_there" };
      await tokenManager.writeTokens(token);
    }
  };

  return (
    <div>
      <button onClick={click}>send fetch</button>
      <button onClick={otherClick}>write tokens</button>
    </div>
  );
};

export default StubButton;
