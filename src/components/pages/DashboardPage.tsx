import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StubButton from "../stubs/StubButton";
import useLocalStorageState from "use-local-storage-state";
import TopItemsContainer from "@database/TopItemsContainer";
import SpotifyRecommender from "@services/spotify/SpotifyRecommender";
const ID = import.meta.env.VITE_SUPABASE_ID;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const username = !!session.user.user_metadata.username
    ? session.user.user_metadata.username
    : session.user.email;

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session]);

  if (!session) {
    return <></>;
  }
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2>Welcome {username}</h2>
      <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
          <TopItemsContainer type={"spotify"} />
        </div>
        {/* <div className="lg:col-start-3 lg:row-end-1 ring-1 ring-gray-900/5  sm:rounded-lg h-64">
          <SpotifyRecommender />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
