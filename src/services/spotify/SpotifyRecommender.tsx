import React from "react";
import useLocalStorageState from "use-local-storage-state";
import Loading from "@components/Loading";
import Error from "@components/Error";
import useService from "@hooks/useService";
const ID = import.meta.env.VITE_SUPABASE_ID;

const SpotifyRecommender: React.FC = () => {
  const [token]: any = useLocalStorageState("spotify-token");
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  if (!token) {
    return <div>Disconnected from Spotify</div>;
  }
  const url =
    "https://api.spotify.com/v1/recommendations?limit=10&market=EG&seed_artists=2UUvyxJDBsg7jnRwMAxNND&seed_genres=chill+breakcore&seed_tracks=0iDqn417kRnYSjbUAkibvu";
  const { data, isSuccess, isLoading, error, refetch } = useService(
    "spotifyRecommendation",
    url,
    token?.access_token,
    "spotify",
    {
      auth_token: session.access_token,
      id: session.user.id,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
