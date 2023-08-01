import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useSupabaseClient } from "../../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { TokenManager } from "../../database/TokenManager";
import store from "../../app/store";
import {
  erase,
  stubWrite,
  validateTokens,
  selectTokens,
} from "../../features/tokens/tokensSlice";
import { useAppSelector } from "../../app/hooks";

const ID = process.env.REACT_APP_SUPABASE_ID;
const StubButton: React.FC = () => {
  const [session, setSession]: any = useLocalStorageState(
    `sb-${ID}-auth-token`
  );
  const [stub]: any = useLocalStorageState("spotify");
  useAppSelector(selectTokens);
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const tokenManager: TokenManager = new TokenManager(
    supabase,
    session.user.id
  );

  useEffect(() => {
    console.log("stub changed");
  }, [stub]);

  const click = async () => {
    console.log("hi");
    await tokenManager.getTokens();
  };

  const otherClick = async () => {
    if (session) {
      // write the tokens to DB
      const mything = { spotify: "hello_there" };
      await tokenManager.writeTokens(mything);
    }
  };

  const dispatchRedux = () => {
    store.dispatch(stubWrite(["spotify"]));
  };

  const dispatchRemove = () => {
    store.dispatch(erase(["spotify"]));
  };

  const otherDispatch = () => {
    store.dispatch(validateTokens(["spotify"]));
  };

  return (
    <div>
      <button onClick={click}>send fetch</button>
      <button onClick={otherClick}>write tokens</button>
      <button onClick={dispatchRedux}>Redux write Spotify token</button>
      <button onClick={dispatchRemove}>Redux Remove Spotify token</button>
      <button onClick={otherDispatch}>Redux dispatch async</button>
      {stub ? <p>I see the stub!</p> : <p>I don't see the stub</p>}
    </div>
  );
};

export default StubButton;
