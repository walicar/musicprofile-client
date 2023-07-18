import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken } from "./spotify.service";
import PageLoader from "../../components/PageLoader";

let didInit = false;
const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([
    "spotify_codeVerifier",
    "spotify_accessToken",
  ]);
  const [params, setParam] = useSearchParams();
  const codeVerifier = cookies.spotify_codeVerifier;
  const code = params.get("code");
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessToken(code!, codeVerifier);
        setCookie("spotify_accessToken", token);
      } catch (e) {
        console.log(e);
      }
    };
    if (!didInit) {
      didInit = true;
      getToken();
    }
  }, [code, codeVerifier, setCookie]);
  navigate("/settings");
  return <PageLoader message={"Connecting to Spotify..."} />;
};
export default SpotifyCallback;
