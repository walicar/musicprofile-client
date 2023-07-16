import React from "react";
import PageLayout from "../components/PageLayout";
import SpotifyButton from "../components/buttons/SpotifyButton";

const SettingsPage: React.FC = () => {
  return (
    <PageLayout>
      <div>
        <h1>Settings Page</h1>
        <SpotifyButton />
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
