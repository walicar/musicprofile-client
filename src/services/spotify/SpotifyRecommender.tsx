import React, { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
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
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const {
    status,
    data: spotifyData,
  }: any = useQuery(
    ["spotify_topitems", session],
    async () => {
      const topitems = new TopItemsWrapper(
        session.access_token,
        session.user.id
      );
      return await topitems.getTopItems("spotify", [
        "songs",
        "artists",
        "genres",
      ]);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  if (!token) return <WidgetError message="Disconnected from Spotify" />;
  // TODO: this line causes everything to break when: user can't get items from 
  //   top_items
  // if (spotifyError) return <WidgetError message="Disconnected from Spotify" />;
  if (status === "success") {
    url = getSpotifyRecommendationUrl(spotifyData);
  }
  const { data, isSuccess, isLoading, error, refetch } = useService(
    "spotifyRecommendation",
    makeServiceParams(
      url!,
      token.access_token,
      { auth_token: session.access_token, id: session.user.id },
      "spotify"
    ),
    {
      refetchOnWindowFocus: false,
      enabled: !!spotifyData && !!url,
    }
  );

  //useEffect(() => {}, [session, token]);

  if (error) return <WidgetError message={error as string} />;

  if (isLoading) {
    return <WidgetLoad />;
  } else if (isSuccess) {
    return (
      <>
        <ul
          role="list"
          className="space-y-2 bg-gray-300 dark:bg-slate-700 p-3 rounded-t-md rounded-br-md"
        >
          {data.tracks.map((item: any, index: number) => (
            <li
              key={`sprec_${index}`}
              className="text-sm overflow-hidden rounded-md justify-between bg-white dark:bg-slate-900 px-5 py-2 shadow flex "
            >
              <div className="flex items-center">
                <img
                  className="inline-block mr-3 h-6 w-6 rounded-full"
                  src={item.album.images[0].url}
                />
                <div>
                <a href={item.uri} className="hover:text-indigo-600">
                  {item.name} {`by ${item.artists[0].name} `}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="relative inline-flex items-center rounded-br-md rounded-bl-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-slate-900 dark:text-neutral-50 dark:hover:bg-slate-600 dark:ring-slate-700"
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
