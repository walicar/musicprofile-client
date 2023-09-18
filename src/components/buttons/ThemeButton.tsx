import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useCookies } from "react-cookie";
import { CookieConfig } from "@utils/cookies";

const ThemeButton: React.FC = () => {
  const [cookies, setCookie]:any = useCookies(["theme"]);
  const toggle = () => {
    if (cookies.theme === "dark") {
      setCookie("theme","light", CookieConfig);
    } else {
      setCookie("theme","dark", CookieConfig);
    }
  };
  return (
    <button onClick={toggle}>
      {cookies.theme === "dark" ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeButton;
