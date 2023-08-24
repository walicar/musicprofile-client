import React from "react";
import { useCookies } from "react-cookie";
import { generateRandomString, getAuthURL } from "./spotify.service";
import useLocalStorageState from "use-local-storage-state";
import {
  store,
  selectTokenCollection,
  useAppSelector,
  erase,
} from "@redux/tokens";

const SpotifyButton: React.FC = () => {
  const [_cookies, setCookie] = useCookies(["spotify-code-verifier"]);
  const [accessToken] = useLocalStorageState("spotify-access-token");
  useAppSelector(selectTokenCollection);

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
