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
      <div className="flex grid-cols-5 grid-rows-1">
        <div className="flex-none pt-9 max-w-30 col-span-1 col-start-1 flex flex-col">
          <button
            type="button"
            className="relative -mr-px inline-flex items-center rounded-tl-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            onClick={() => setService("spotify")}
          >
            spotify
          </button>
          <button
            type="button"
            className="relative -mt-px -mr-px inline-flex items-center rounded-bl-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            onClick={() => {
              console.log("trying to set service to lastfm, not finished");
              setService("spotify");
            }}
          >
            lastfm
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
