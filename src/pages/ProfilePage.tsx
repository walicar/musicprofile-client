import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import PageLayout from "../components/PageLayout";
import Profile from "../components/Profile";

const ProfilePage: React.FC = () => {
  return (
    <PageLayout>
      <div>This is the ProfilePage</div>
      <Profile />
    </PageLayout>
  );
};
export default ProfilePage;
