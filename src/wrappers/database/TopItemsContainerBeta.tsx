import TopItems from "./TopItems";
import { useState } from "react";
const Services = {
  SPOTIFY: "spotify",
  LASTFM: "lastfm",
};

export default function TopItemsContainerBeta() {
  const [service, setService] = useState(Services.SPOTIFY);

  return (
    <>
      {/* <h1>{service.charAt(0).toUpperCase() + service.slice(1)} Leaderboard</h1> */}
      <div className="grid grid-cols-5 grid-rows-1">
        <div className="pt-12 col-span-1 col-start-1 flex flex-col">
          <button
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            onClick={() => setService("spotify")}
          >
            spotify
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            onClick={() => {
              console.log("trying to set service to lastfm, not finished");
              setService("spotify");
            }}
          >
            lastfm
          </button>
        </div>
        <div className="col-span-4">
            <TopItems type={service} />
        </div>
      </div>
    </>
  );
}
