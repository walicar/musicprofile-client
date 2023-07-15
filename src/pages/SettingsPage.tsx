import React from "react";
import PageLayout from "../components/PageLayout";

interface Props {
  content: string;
}

const SettingsPage: React.FC<Props> = ({ content }) => {
  return (
    <PageLayout>
      <div>
        <h1>Welcome</h1>
        <p>{content}</p>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
