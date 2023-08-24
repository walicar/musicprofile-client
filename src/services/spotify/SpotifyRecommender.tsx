import React, { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import store from "../../app/store";
import {
  selectTokenCollection,
  validateTokens,
} from "../../features/tokens/tokensSlice";
import { useAppSelector } from "../../app/hooks";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

let didInit = false; // maybe we don't need cuz of react query

const SpotifyRecommender: React.FC = () => {
  const [token]: any = useLocalStorageState("spotify-access-token");
  useAppSelector(selectTokenCollection);
  const tokenStatus = useAppSelector((state) => state.tokens.status);
  const [errorMessage, setErrorMessage] = useState("");
  const { status, error, data, refetch } = useQuery(
    "spotifyRecommendData",
    async () => {
      const url =
        "https://api.spotify.com/v1/recommendations?limit=10&market=EG&seed_artists=2UUvyxJDBsg7jnRwMAxNND&seed_genres=chill+breakcore&seed_tracks=0iDqn417kRnYSjbUAkibvu";
      const headers = {
        Authorization: `Bearer ${token.access_token}`,
      };
      const res = await fetch(url, { method: "GET", headers: headers });
      const data = await res.json();
      if (res.status === 401) {
        console.log("yo was this set")
        setErrorMessage(data.error.message);
      }
      return data;
    },
    { enabled: !!token && tokenStatus === "validated", refetchOnMount: false }
  );

  useEffect(() => {
    if (!didInit && tokenStatus === "idle") {
      console.log("token is idle, i'm going to validate");
      store.dispatch(validateTokens(["spotify"]));
      didInit = true;
    }

    if (tokenStatus === "validated" && errorMessage == "The access token expired") {
      console.log("error check called: ", errorMessage);
      setErrorMessage("");
      store.dispatch(validateTokens(["spotify"]));
    }

    if (tokenStatus === "validated") {
      console.log("SpotifyRecommender: validated");
    }
  }, [tokenStatus, errorMessage]);

  if (!token) {
    return <div>Disconnected from Spotify</div>;
  }

  if (error || data?.error) {
    return <Error message={data.error.message} />;
  }

  if (status === "loading") {
    return <Loading />;
  } else if (status === "success") {
    return (
      <>
        <ul>
          {data.tracks.map((item: any) => (
            <li key={item.id}>
              {item.name} by {item.artists[0].name}
            </li>
          ))}
        </ul>
        <div>{data.tracks.length} items in total!</div>
        <button onClick={refetch as any}>Refresh!</button>
      </>
    );
  } else {
    return <Error />;
  }
};

export default SpotifyRecommender;
