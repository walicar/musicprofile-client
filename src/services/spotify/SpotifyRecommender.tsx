import React, { useEffect } from "react";
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
  const { status, error, data }: any = useQuery(
    "spotifyRecommendData",
    async () => {
      const url =
        "https://api.spotify.com/v1/recommendations?limit=10&market=EG&seed_artists=2UUvyxJDBsg7jnRwMAxNND&seed_genres=chill+breakcore&seed_tracks=0iDqn417kRnYSjbUAkibvu";
      const headers = {
        Authorization: `Bearer ${token.access_token}`,
      };
      const res = await fetch(url, { method: "GET", headers: headers });
      const data = await res.json();
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

    if (tokenStatus === "validated") {
      console.log("I validated");
    }
  }, [tokenStatus]);

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
            <li key={item.id}>{item.name} by {item.artists[0].name}</li>
          ))}
        </ul>
        <div>{data.tracks.length} items in total!</div>
      </>
    );
  } else {
    return <Error />;
  }
};

export default SpotifyRecommender;
