import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {
  generateRandomString,
  getAuthURL,
} from "../../services/spotify/spotify.service";

const SpotifyButton: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["spotify_codeVerifier", "spotify_accessToken"]);

  const send = async () => {
    const codeVerifier = generateRandomString(128);
    setCookie("spotify_codeVerifier", codeVerifier);
    const URL = await getAuthURL(codeVerifier);
    window.location.replace(URL);
  };

  const disconnect = () => {
    removeCookie("spotify_accessToken");
    removeCookie("spotify_codeVerifier");
  };

  console.log(cookies.spotify_accessToken);

  if (cookies.spotify_accessToken) {
    return <button onClick={disconnect}>disconnect from spotify</button>
  }
  return <button onClick={send}>connect to spotify</button>;
};

export default SpotifyButton;
