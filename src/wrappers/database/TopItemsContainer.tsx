import TopItems from "./TopItems";
import { useState } from "react";
const Services = {
  SPOTIFY: "spotify",
  LASTFM: "lastfm",
};

const TopItemsContainer: React.FC = () => {
  const [service, setService] = useState(Services.SPOTIFY);

  return (
    <>
      <div className="flex">
        <div className="flex-none pt-9 max-w-30 col-span-1 col-start-1 flex flex-col">
          <button
            type="button"
            className="relative -mr-px inline-flex items-center rounded-tl-md bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-neutral-50 ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:z-10"
            onClick={() => setService("spotify")}
          >
            Spotify
          </button>
          <button
            type="button"
            className="relative -mt-px -mr-px inline-flex items-center rounded-bl-md bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-neutral-50 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 focus:z-10 dark:ring-slate-700"
            onClick={() => {
              console.log("trying to set service to lastfm, not finished");
              setService("spotify");
            }}
          >
            Lastfm
          </button>
        </div>
        <div className="flex-1">
          <TopItems type={service} />
        </div>
      </div>
    </>
  );
};
export default TopItemsContainer;
