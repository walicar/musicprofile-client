import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import { getAccessToken } from "./spotify.service";

let didInit = false;
const SpotifyCallback: React.FC = () => {
    const [cookies, setCookie] = useCookies(['spotify_codeVerifier', 'spotify_accessToken']);
    const [params, setParam] = useSearchParams();
    const codeVerifier = cookies.spotify_codeVerifier;
    const code = params.get("code");
    console.log(codeVerifier);
    console.log(code);
    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await getAccessToken(code!, codeVerifier);
                console.log("I GOT THE TOKEN: " + token);
                setCookie("spotify_accessToken", token);
            } catch (e) {
                console.log('get token failure')
            }
        }
        if (!didInit) {
            didInit = true;
            getToken();
        }
    }, [code, codeVerifier, setCookie])
    return (<><p>Connecting to spotify...</p></>);
};
export default SpotifyCallback;
