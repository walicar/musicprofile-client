import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StubButton from "../stubs/StubButton";
import useLocalStorageState from "use-local-storage-state";
import TopItemsContainer from "@database/TopItemsContainer";
import SpotifyRecommender from "@services/spotify/SpotifyRecommender";
const ID = import.meta.env.VITE_SUPABASE_ID;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const username = !!session.user.user_metadata.username ? session.user.user_metadata.username : session.user.email;

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session]);

  if (!session) {
    return <></>;
  }
  return (
      <>
        <h1>Dashboard</h1>
        <h2>Welcome {username}</h2>
        <StubButton />
        <h2>Spotify Recommender</h2>
        <SpotifyRecommender />
        <TopItemsContainer type={"spotify"} />
      </>
  );
};

export default DashboardPage;
