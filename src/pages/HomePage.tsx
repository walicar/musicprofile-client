import React from "react";
import { useCookies } from "react-cookie";
import PageLayout from "../components/PageLayout";

interface Props {
  content: string;
}

const HomePage: React.FC<Props> = ({ content }) => {
  const [cookies, setCookie] = useCookies(["myCookie"]);
  const cookieVal = cookies.myCookie;
  const handleClick = () => {
    setCookie("myCookie", "benjamin");
  };

  return (
    <PageLayout>
      <div>
        <h1>Welcome</h1>
        <p>{content}</p>
        <button onClick={handleClick}>set cookie</button>
      </div>
    </PageLayout>
  );
};

export default HomePage;
