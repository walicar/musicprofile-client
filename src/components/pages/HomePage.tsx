import React from "react";
interface Props {
  content: string;
}

const HomePage: React.FC<Props> = ({ content }) => {
  return (
      <>
        <h1>Home</h1>
        <p>{content}</p>
      </>
  );
};

export default HomePage;
