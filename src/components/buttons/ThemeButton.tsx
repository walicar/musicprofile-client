import React from "react";
import useLocalStorageState from "use-local-storage-state";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

const ThemeButton: React.FC = () => {
  const [theme, setTheme]: any = useLocalStorageState("theme");
  const toggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <button onClick={toggle}>
        {theme === "dark" ? <MoonIcon className="h-6 w-6"/> : <SunIcon className="h-6 w-6"/>}
    </button>
  );
};

export default ThemeButton;
