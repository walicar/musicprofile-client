import React from "react";
import { useCookies } from "react-cookie";
import { generateRandomString, getAuthURL, getAccessToken } from "../../services/spotify.service";

const SpotifyButton: React.FC = () => {
  const [cookies, setCookie] = useCookies(["spt_codeVerifier"]);
  const send = async () => {
    const codeVerifier = generateRandomString(128);
    setCookie("spt_codeVerifier", codeVerifier);
    const URL = await getAuthURL(codeVerifier);
    window.location.replace(URL)
  }
  return (
    <button onClick={send} >
      connect to spotify
    </button>
  );
};

export default SpotifyButton;
