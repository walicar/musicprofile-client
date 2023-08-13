import React, { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import store from "../../app/store";
import {
  selectTokenCollection,
  validateTokens,
} from "../../features/tokens/tokensSlice";
import { useAppSelector } from "../../app/hooks";
import { useQuery } from "react-query";

const data = ["fart"];
let status = "farted";
//
let didInit = false; // maybe we don't need cuz of react query

const SpotifyRecommender: React.FC = () => {
  const [token]: any = useLocalStorageState("spotify-access-token");
  useAppSelector(selectTokenCollection);
  const tokenStatus = useAppSelector((state) => state.tokens.status);
  const { status, error, data }: any = useQuery(
    "spotifyRecommendData",
    async () => {
      console.log("does this happen");
      // store.dispatch(validateTokens(["spotify"]));
      if (!didInit) {
        // if (!didInit && token && tokenStatus === 'validated') {
        const url =
          "https://api.spotify.com/v1/recommendations?limit=10&market=EG&seed_artists=2UUvyxJDBsg7jnRwMAxNND&seed_genres=chill+breakcore&seed_tracks=0iDqn417kRnYSjbUAkibvu";
        const headers = {
          Authorization: `Bearer ${token.access_token}`,
        };
        console.log("trying to fetch");
        const res = await fetch(url, { method: "GET", headers: headers });
        const data = await res.json();
        console.log("what is my data", data);
        return data;
      }
      return {id:1, tracks: ["stub"]}
    }, 
    {enabled: !!token }
  );

  // useEffect(() => {console.log("DID THIS GET UPDATED", token)}, [data, token]);

  /*
  useEffect(() => {
    if (tokenStatus === 'validated') {
      console.log("I validated");
    }
  }, [tokenStatus])
  */
  if (!token) {
    return <div>Disconnected from Spotify</div>;
  }
   
  
  if (status === "loading") {
    return <div>Loading Items...</div>;
  } else if (status === "success") {
    return (
      <>
        {/* {data.tracks.forEach((item: any) => {
          // console.log(item);
        })} */}
        <div>{data.tracks.length} items in total!</div>
      </>
    );
  } else {
    return <div>Error: {error}</div>
  }
};

export default SpotifyRecommender;
