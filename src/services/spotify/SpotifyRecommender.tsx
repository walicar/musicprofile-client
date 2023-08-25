import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import Loading from "@components/Loading";
import Error from "@components/Error";
import useService, { makeServiceParams } from "@hooks/useService";
import { useQuery } from "react-query";
import TopItemsWrapper from "@database/TopItemsWrapper";
import { getSpotifyRecommendationUrl } from "./spotify.utils";
const ID = import.meta.env.VITE_SUPABASE_ID;

const SpotifyRecommender: React.FC = () => {
  const [token]: any = useLocalStorageState("spotify-token");
  if (!token) {
    return <div>Disconnected from Spotify</div>;
  }
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const {
    status,
    data: spotifyData,
    error: spotifyError,
  }: any = useQuery(
    ["spotify_topitems", session],
    async () => {
      const topitems = new TopItemsWrapper(
        session.access_token,
        session.user.id
      );
      return await topitems.getTopItems("spotify", ["songs", "artists", "genres"]);
    },
    { refetchOnMount: true, refetchOnWindowFocus: false }
  );
  if (spotifyError) {
    return <div>Could not connect to DB</div>;
  }
  let url = undefined;
  if (status === "success") {
    url = getSpotifyRecommendationUrl(spotifyData);
  }
  const serviceParams = makeServiceParams(
    url!,
    token.access_token,
    { auth_token: session.access_token, id: session.user.id },
    "spotify"
  );
  const serviceOptions = {
    refetchOnWindowFocus: false,
    enabled: !!spotifyData,
  };
  const { data, isSuccess, isLoading, error, refetch } = useService(
    "spotifyRecommendation",
    serviceParams,
    serviceOptions
  );

  useEffect(() => {
  }, [session, token]);

  if (!token) {
    return <div>Disconnected from Spotify</div>;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (isLoading) {
    return <Loading />;
  } else if (isSuccess) {
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
