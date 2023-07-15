import React from "react";
import LoginButton from "../components/LoginButton";
import PageLayout from "../components/PageLayout";
interface Props {
  content: string;
}

const LogInPage: React.FC<Props> = ({ content }) => {
  return (
    <PageLayout>
      <div>
        <h1>SignIn</h1>
        <p>{content}</p>
        <LoginButton />
      </div>
    </PageLayout>
  );
};

export default LogInPage;
