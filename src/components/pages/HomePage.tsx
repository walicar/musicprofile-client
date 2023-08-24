import React from "react";
import PageLayout from "../PageLayout";
interface Props {
  content: string;
}

const HomePage: React.FC<Props> = ({ content }) => {
  return (
    <PageLayout>
      <div>
        <h1>Home</h1>
        <p>{content}</p>
      </div>
    </PageLayout>
  );
};

export default HomePage;
