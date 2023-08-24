import React, { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import store from "@redux/store";
import { useQuery } from "react-query";
import Loading from "@components/Loading";
import Error from "@components/Error";
import { isEmpty } from "@utils/util";
const ID = import.meta.env.VITE_SUPABASE_ID;
import {
  selectTokenCollection,
  validateTokens,
  useAppSelector,
} from "@redux/tokens";

let initalized = false;
const SpotifyRecommender: React.FC = () => {
  const [token]: any = useLocalStorageState("spotify-access-token");
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const tokenCollection = useAppSelector(selectTokenCollection);
  const tokenStatus = useAppSelector((state) => state.tokens.status);
  const [errorMessage, setErrorMessage] = useState("");
  const { status, error, data, refetch } = useQuery(
    "spotifyRecommendData",
    async () => {
      const { access_token } = JSON.parse(tokenCollection.spotify);
      const url =
        "https://api.spotify.com/v1/recommendations?limit=10&market=EG&seed_artists=2UUvyxJDBsg7jnRwMAxNND&seed_genres=chill+breakcore&seed_tracks=0iDqn417kRnYSjbUAkibvu";
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };
      const res = await fetch(url, { method: "GET", headers: headers });
      const data = await res.json();
      if (res.status === 401) {
        console.log("yo was this set");
        setErrorMessage(data.error.message);
      }
      return data;
    },
    {
      enabled: !isEmpty(tokenCollection) && tokenStatus === "idle",
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    const validatePayload = {
      services: ["spotify"],
      opt: {
        accessToken: session.access_token,
        id: session.user.id,
      },
    };

    if (!initalized && tokenStatus === "idle") {
      store.dispatch(validateTokens(validatePayload));
      initalized = true;
    }

    if (
      tokenStatus === "validated" &&
      errorMessage === "The access token expired"
    ) {
      setErrorMessage("");
      store.dispatch(validateTokens(validatePayload));
    }

    if (tokenStatus === "validated") {
      console.log("SpotifyRecommender: validated");
    }
  }, [tokenStatus, errorMessage]);

  if (!token) {
    return <div>Disconnected from Spotify</div>;
  }
  if (error) {
    return <Error message={error} />;
  }

  if (data?.error) {
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
