import React from "react";
import LoginButton from "../components/LoginButton";
interface Props {
  content: string;
}

const LogInPage: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <h1>SignIn</h1>
      <p>{content}</p>
      <LoginButton />
    </div>
  );
};

export default LogInPage;
