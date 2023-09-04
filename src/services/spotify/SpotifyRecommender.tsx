import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import Error from "@components/Error";
import useService, { makeServiceParams } from "@hooks/useService";
import { useQuery } from "react-query";
import TopItemsWrapper from "@database/TopItemsWrapper";
import { getSpotifyRecommendationUrl } from "./spotify.utils";
import WidgetError from "@components/WidgetError";
import WidgetLoad from "@components/WidgetLoad";

const ID = import.meta.env.VITE_SUPABASE_ID;

const SpotifyRecommender: React.FC = () => {
  let url = undefined;
  const [token]: any = useLocalStorageState("spotify-token");
  if (!token) return <WidgetError message="Disconnected from Spotify" />;
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
        session.user.id,
      );
      return await topitems.getTopItems("spotify", [
        "songs",
        "artists",
        "genres",
      ]);
    },
    { refetchOnMount: true, refetchOnWindowFocus: false },
  );
  if (spotifyError) return <div>Could not connect to DB</div>;
  if (status === "success") {
    url = getSpotifyRecommendationUrl(spotifyData);
  }
  const { data, isSuccess, isLoading, error, refetch } = useService(
    "spotifyRecommendation",
    makeServiceParams(
      url!,
      token.access_token,
      { auth_token: session.access_token, id: session.user.id },
      "spotify",
    ),
    {
      refetchOnWindowFocus: false,
      enabled: !!spotifyData && !!url,
    },
  );

  useEffect(() => {}, [session, token]);

  if (error) return <Error message={error} />;

  if (isLoading) {
    return <WidgetLoad />;
  } else if (isSuccess) {
    return (
      <>
        <ul
          role="list"
          className="space-y-2 bg-gray-300 p-3 rounded-t-md rounded-br-md"
        >
          {data.tracks.map((item: any, index: number) => (
            <li
              key={`sprec_${index}`}
              className="text-sm overflow-hidden rounded-md justify-between bg-white px-5 py-2 shadow flex"
            >
              <div className="flex items-center">
                <img
                  className="inline-block mr-3 h-6 w-6 rounded-full"
                  src={item.album.images[0].url}
                />
                <div>
                  {item.name} {`by ${item.artists[0].name} `}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="relative inline-flex items-center rounded-br-md rounded-bl-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          onClick={refetch as any}
        >
          Refresh
        </button>
      </>
    );
  } else {
    return <WidgetError />;
  }
};

export default SpotifyRecommender;
