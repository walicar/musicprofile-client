import React from "react";
import { useCookies } from "react-cookie";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";

interface Props {
  content: string;
}

const HomePage: React.FC<Props> = ({ content }) => {
  const [cookies, setCookie] = useCookies(['myCookie']);
  const cookieVal = cookies.myCookie;
  const handleClick = () => {
    setCookie('myCookie', 'benjamin');
  };
  return (
    <div>
      <h1>Welcome</h1>
      <p>{content}</p>
      <Profile />
      <button onClick={handleClick}>set cookie</button>
      <LogoutButton />
    </div>
  );
};

export default HomePage;
