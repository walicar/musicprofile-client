import React from "react";

interface Props {
  content: string;
}

const LogInPage: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <h1>SignIn</h1>
      <p>{content}</p>
    </div>
  );
};

export default LogInPage;
