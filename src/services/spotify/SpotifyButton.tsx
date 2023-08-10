import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { generateRandomString, getAuthURL } from "./spotify.service";
import store from "../../app/store";
import { erase } from "../../features/tokens/tokensSlice";
import useLocalStorageState from "use-local-storage-state";
import { selectTokenCollection } from "../../features/tokens/tokensSlice";
import { useAppSelector } from "../../app/hooks";

const SpotifyButton: React.FC = () => {
  const [cookies, setCookie] = useCookies(["spotify-code-verifier"]);
  const [accessToken] = useLocalStorageState("spotify-access-token");
  /*
  const state = useAppSelector(selectTokenCollection);
  useEffect(() => {
    console.log("Did state change??", state);
  }, [state]);
  */

  const connect = async () => {
    const verifier = generateRandomString(128);
    setCookie("spotify-code-verifier", verifier, { path: "/" });
    const URL = await getAuthURL(verifier);
    window.location.replace(URL);
  };

  const disconnect = async () => {
    store.dispatch(erase(["spotify"]));
  };

  return (
    <div>
      <>
        {accessToken ? (
          <button onClick={disconnect}>disconnect from spotify</button>
        ) : (
          <button onClick={connect}>connect to spotify</button>
        )}
      </>
    </div>
  );
};

export default SpotifyButton;
