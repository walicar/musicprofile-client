import React from "react";
interface Props {
  content: string;
}

const HomePage: React.FC<Props> = ({ content }) => {
  return (
      <div>
        <h1>Home</h1>
        <p>{content}</p>
      </div>
  );
};

export default HomePage;