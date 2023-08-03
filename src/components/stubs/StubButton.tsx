import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useSupabaseClient } from "../../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { TokenManager } from "../../database/TokenManager";
import { getFromLocalStorage } from "../../utils/tokens";
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
    `sb-${ID}-auth-token`,
  );
  const [stub]: any = useLocalStorageState("spotify-access-token");
  const state = useAppSelector(selectTokens);
  console.log("checking redux state: ", state);
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const tokenManager: TokenManager = new TokenManager();

  useEffect(() => {
    console.log("stub changed");
    console.log("state changed", state);
  }, [stub, state]);
  const oldFetch = async () => {
    const { data } = await supabase
      .from("tokens")
      .select("id, spotify, lastfm");
    console.log(data);
  };

  const click = async () => {
    console.log("hi");
    await tokenManager.getTokens();
  };

  const otherClick = async () => {
    if (session) {
      // write the tokens to DB
      const mything = { spotify: "check_test_different" };
      await tokenManager.writeTokens(mything);
    }
  };

  const dispatchRedux = () => {
    store.dispatch(stubWrite(["spotify"]));
  };

  const dispatchRemove = () => {
    store.dispatch(erase(["spotify"]));
    console.log("did I erase the state");
  };

  const dispatchValidate = () => {
    store.dispatch(validateTokens(["spotify"]));
  };

  const utilTokens = () => {
    const res = getFromLocalStorage();
    console.log("GET FROM LOCAL STORAGE: ", res);
  };

  return (
    <div>
      <button onClick={oldFetch}>Old Fetch to DB</button>
      <button onClick={click}>send fetch TO DATABASE!!!!!!!!!</button>
      <button onClick={otherClick}>write tokens TO DATABASE!!!!!!!!!!</button>
      <br></br>
      <br></br>
      <button onClick={dispatchRedux}>Redux write Spotify token</button>
      <button onClick={dispatchRemove}>Redux Remove Spotify token</button>
      <button onClick={dispatchValidate}>Redux validate tokens</button>
      <button onClick={utilTokens}>UTIL: Get from local storage</button>
      {stub ? <p>I see the stub!</p> : <p>I don't see the stub</p>}
    </div>
  );
};

export default StubButton;
