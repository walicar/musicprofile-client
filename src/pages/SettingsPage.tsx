import React, { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { useNavigate } from "react-router-dom";
import SpotifyButton from "../components/buttons/SpotifyButton";
import LastfmButton from "../components/buttons/LastfmButton";

type Prop = {
  session?: any;
};

const SettingsPage: React.FC<Prop> = ({ session }) => {
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
