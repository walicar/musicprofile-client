import React from "react";
import { useCookies } from "react-cookie";
import {
  generateRandomString,
  getAuthURL,
} from "../../services/spotify/spotify.service";
import useLocalStorageState from "use-local-storage-state";

const SpotifyButton: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "spotify-code-verifier",
  ]);
  const [accessToken, setAccessToken, { removeItem }] = useLocalStorageState(
    "spotify-access-token",
  );

  const connect = async () => {
    const verifier = generateRandomString(128);
    setCookie("spotify-code-verifier", verifier, {path: "/"});
    const URL = await getAuthURL(verifier);
    window.location.replace(URL);
  };

  const disconnect = () => {
    removeItem();
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
