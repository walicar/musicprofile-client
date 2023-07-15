import React from "react";
import { useCookies } from "react-cookie";
import LogoutButton from "../components/buttons/LogoutButton";
import Profile from "../components/Profile";
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
        <Profile />
        <button onClick={handleClick}>set cookie</button>
        <LogoutButton />
      </div>
    </PageLayout>
  );
};

export default HomePage;
