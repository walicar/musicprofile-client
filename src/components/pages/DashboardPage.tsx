import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import TopItemsContainer from "@database/TopItemsContainer";
import Profile from "@components/Profile";
import WidgetContainer from "@components/Widget/WidgetContainer";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import config from "@utils/config";
const ID = config.SUPABASE_ID;

const borderStyle =
  "p-2 shadow-sm ring-1 ring-gray-900/5 dark:ring-slate-700 rounded-lg";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/login");
    });

    if (!session) {
      navigate("/login");
    }
  }, [session, navigate, supabase]);

  if (!session) {
    return <></>;
  }
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-y-3.5 lg:grid lg:grid-rows-5 lg:grid-cols-12 lg:gap-4">
        <div
          className={
            "order-2 lg:order-1 lg:row-span-5 lg:col-span-8 " + borderStyle
          }
        >
          <TopItemsContainer />
        </div>
        <div
          className={
            "order-1 flex items-center relative lg:order-2 lg:row-start-1 lg:row-span-1 lg:col-start-9 lg:col-span-4 " +
            borderStyle
          }
        >
          <Profile />
          {/* <div className="absolute bottom-2 right-3 text-sm cursor-pointer font-semibold text-orange-500 hover:text-orange-400">
            Share
          </div> */}
        </div>
        <div
          className={
            "order-last lg:row-start-2 lg:row-span-4 lg:col-start-9 lg:col-span-4 " +
            borderStyle
          }
        >
          <WidgetContainer />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
