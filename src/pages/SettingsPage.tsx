import React from "react";

interface Props {
  content: string;
}

const SettingsPage: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>{content}</p>
    </div>
  );
};

export default SettingsPage;
