import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useSupabaseClient } from "../../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import { TokenManager } from "../../database/TokenManager";
import { getFromLocalStorage, tokenToService } from "../../utils/tokens";
import store from "../../redux/app/store";
import {
  erase,
  validateTokens,
  selectTokenCollection,
} from "../../redux/features/tokens/tokensSlice";
import { useAppSelector } from "../../redux/app/hooks";
import { refreshSpotifyToken } from "../../services/spotify/spotify.service";
import TopItemsManager from "../../database/TopItems/TopItemsManager";
import ServerWrapper from "../../server/serverWrapper";

const ID = import.meta.env.VITE_SUPABASE_ID;
const API_KEY = import.meta.env.VITE_SUPABASE_PUB;

const StubButton: React.FC = () => {
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [stub]: any = useLocalStorageState("spotify-access-token");
  const tokenCollection = useAppSelector(selectTokenCollection);
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const tokenManager: TokenManager = new TokenManager();
  const topItemsManager: TopItemsManager = new TopItemsManager();
  const server: ServerWrapper = new ServerWrapper(
    session.access_token,
    session.user.id
  );

  useEffect(() => {
    console.log("state changed", tokenCollection);
  }, [stub, tokenCollection]);
  
  const postUpdate = async () => {
    // dispatch(validate())
    console.log(tokenCollection);
    const serviceTokens = tokenToService(tokenCollection);
    console.log("Service", serviceTokens);
    const data = await server.postUpdate(serviceTokens);
    console.log(data);
  }

  const oldFetch = async () => {
    const { data } = await supabase
      .from("tokens")
      .select("id, spotify, lastfm");
    console.log(data);
  };

  const testRefreshToken = async () => {
    const refreshTokens = await tokenManager.getTokens();
    console.log("Getting spotify refresh token", refreshTokens["spotify"]);
    const result = await refreshSpotifyToken(refreshTokens["spotify"]);
    console.log(result);
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

  const gqlFetch = async () => {
    console.log("mysession", session);
    const endpoint = "http://localhost:54321/graphql/v1";
    const headers = {
      Authorization: `Bearer ${session.access_token}`,
      apiKey: API_KEY!,
      "content-type": "application/json",
    };
    const gql = {
      query: `query {
        topitemsCollection(filter: {id: {eq: "0f954489-f67e-43a2-83bc-ba35ad4f92ff"}}) {
          edges {
            node {
              id
              songs
              genres
              artists
            }
          }
        }
      }`,
    };
    const opt = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(gql),
    };
    fetch(endpoint, opt)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const topItemsManagerTest = async () => {
    const data = await topItemsManager.getTopItems("songs genres artists");
    console.log("from topitems maanager", data);
  };

  return (
    <div>
      <button onClick={oldFetch}>Old Fetch to DB</button>
      <button onClick={click}>send fetch TO DATABASE!!!!!!!!!</button>
      <button onClick={otherClick}>write tokens TO DATABASE!!!!!!!!!!</button>
      <button onClick={testRefreshToken}>
        simulate refreshing tokens get r_token from db then send to spotify api
      </button>
      <br></br>
      <br></br>
      <button onClick={dispatchRemove}>Redux Remove Spotify token</button>
      <button onClick={dispatchValidate}>Redux validate tokens</button>
      <button onClick={utilTokens}>UTIL: Get from local storage</button>
      <br></br>
      <br></br>
      <button onClick={gqlFetch}>gql fetch</button>
      <button onClick={topItemsManagerTest}>topitemsmanager test</button>
      <br></br>
      <br></br>
      <button onClick={postUpdate}>This will simulate talking to backend</button>
      {stub ? <p>I see the stub!</p> : <p>I don't see the stub</p>}
    </div>
  );
};

export default StubButton;
