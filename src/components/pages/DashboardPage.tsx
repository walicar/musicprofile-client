import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import TopItemsContainer from "@database/TopItemsContainer";
import Profile from "@components/Profile";
import SpotifyRecommender from "@services/spotify/SpotifyRecommender";
const ID = import.meta.env.VITE_SUPABASE_ID;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session]);

  if (!session) {
    return <></>;
  }
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[80vh]">
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-2 gap-y-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="min-h-[80vh] -mx-4 px-1 py-2 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-8 xl:pb-8 xl:pt-8">
            <TopItemsContainer />
          </div>
          <div className="lg:col-start-3 lg:row-end-1 grid grid-rows-1 gap-y-2">
            <div className="ring-1 ring-gray-900/5 px-4 py-4 sm:rounded-lg">
              <Profile />
            </div>
            <div className="ring-1 ring-gray-900/5  row-start-2 px-4 py-4 sm:rounded-lg">
                <SpotifyRecommender />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
