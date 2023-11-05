import TopItems from "./TopItems";
import { useState } from "react";
const Services: any = {
  spotify: <TopItems type={"spotify"} />,
  lastfm: <TopItems type={"lastfm"} />,
};

const TopItemsContainer: React.FC = () => {
  const [service, setService] = useState("spotify");

  return (
    <>
      <div className="flex">
        <div className="flex-none pt-8 sm:pt-9 max-w-30 col-span-1 col-start-1 flex flex-col">
          <button
            type="button"
            className={`${
              service == "spotify"
                ? "text-orange-500"
                : "text-gray-900 dark:text-neutral-50"
            } relative -mr-px inline-flex items-center rounded-tl-md bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:z-10`}
            onClick={() => setService("spotify")}
          >
            Spotify
          </button>
          <button
            type="button"
            className={`${
              service == "lastfm"
                ? "text-orange-500"
                : "text-gray-900 dark:text-neutral-50"
            } relative -mt-px -mr-px inline-flex items-center rounded-bl-md bg-white dark:bg-slate-900 px-3 py-2 text-xs sm:text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 focus:z-10 dark:ring-slate-700`}
            onClick={() => setService("lastfm")}
          >
            Lastfm
          </button>
        </div>
        <div className="flex-1">{Services[service]}</div>
      </div>
    </>
  );
};
export default TopItemsContainer;
