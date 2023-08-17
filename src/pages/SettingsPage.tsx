import React, { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import SpotifyButton from "../services/spotify/SpotifyButton";
import LastfmButton from "../components/buttons/LastfmButton";
import useLocalStorageState from "use-local-storage-state";
const ID = import.meta.env.VITE_SUPABASE_ID;

const SettingsPage: React.FC = () => {
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, []);

  if (!session) {
    return <></>;
  }

  return (
    <PageLayout>
      <div>
        <h1>Settings</h1>
        <h2>Welcome {session.user.email}</h2>
        <SpotifyButton />
        <LastfmButton />
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
