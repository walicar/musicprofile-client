import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUserForm from "@components/forms/UpdateUserForm";
import SpotifyButton from "@spotify/SpotifyButton";
import LastfmButton from "@lastfm/LastfmButton";
import useLocalStorageState from "use-local-storage-state";
import DeleteButton from "@components/buttons/DeleteButton";
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
      <>
        <h1>Settings</h1>
        <span>Welcome {session.user.email}</span>
        <h2>Update Account Information</h2>
        <UpdateUserForm />
        <DeleteButton />
        <h2>Streaming Platforms</h2>
        <SpotifyButton />
        <LastfmButton />
      </>
  );
};

export default SettingsPage;
