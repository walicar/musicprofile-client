import React, { useEffect } from "react";
import PageLayout from "../PageLayout";
import { useNavigate } from "react-router-dom";
import UpdateUserForm from "@components/forms/UpdateUserForm";
import SpotifyButton from "@spotify/SpotifyButton";
import LastfmButton from "@lastfm/LastfmButton";
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
        <span>Welcome {session.user.email}</span>
        <h2>Update Account Information</h2>
        <UpdateUserForm />
        <h2>Streaming Platforms</h2>
        <SpotifyButton />
        <LastfmButton />
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
