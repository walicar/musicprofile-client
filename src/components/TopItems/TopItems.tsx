import React, { useEffect, useState } from "react";
import TopItemsWrapper from "../../wrappers/database/TopItemsWrapper";
import { TokenWrapper } from "../../wrappers/database/TokenWrapper";
import ServerWrapper from "@server/ServerWrapper";
import { useQuery } from "react-query";
import List from "@components/List";
import { validate } from "@utils/util";
import useLocalStorageState from "use-local-storage-state";
import WidgetError from "@components/Widget/WidgetError";
import WidgetLoad from "@components/Widget/WidgetLoad";
import { SupabaseClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@components/contexts/SupabaseContext";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import config from "@utils/config";
const ID = config.SUPABASE_ID;

type Prop = {
  type: string;
};

const Categories = {
  SONGS: "songs",
  ARTISTS: "artists",
  GENRES: "genres",
};

const TopItems: React.FC<Prop> = ({ type }) => {
  // TODO: set and use session from useSupabaseClient();
  const supabase: SupabaseClient<any> = useSupabaseClient();
  const [session, setSession]: any = useLocalStorageState(
    `sb-${ID}-auth-token`
  );
  const navigate = useNavigate();
  const [token, setToken]: any = useLocalStorageState(`${type}-token`);
  const [category, setCategory] = useState(Categories.SONGS);
  //
  const { status, error, data, refetch }: any = useQuery(
    [`${type}_topitems`, session],
    async () => {
      const topitems = new TopItemsWrapper(
        session.access_token,
        session.user.id
      );
      const msg = await topitems.getTopItems(type, [
        "songs",
        "artists",
        "genres",
      ]);
      if (msg.error) throw new Error(msg.error);
      return msg;
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    const handleUpdate = async () => {
      const topitems = new TopItemsWrapper(
        session.access_token,
        session.user.id
      );
      const lastUpdated = await topitems.getLastUpdated(type);
      const updateAt = new Date(lastUpdated);
      updateAt.setDate(updateAt.getDate() + 1);
      if (updateAt < new Date()) {
        const tokens = new TokenWrapper(session.access_token, session.user.id);
        const server = new ServerWrapper(session.access_token);
        if (type != "lastfm")
          await validate(tokens.validateTokens, [type], { [type]: setToken });
        await server.postUpdate({
          [type]: token.access_token,
        });
      }
    };
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/login");
      setSession(session);
    });
    if (token) handleUpdate();
  }, [session, token, navigate, setSession, setToken, supabase, type]);

  if (status === "loading") {
    return <WidgetLoad />;
  }

  if (error) {
    return <WidgetError message={error.message} />;
  }

  if (status === "success") {
    const { songs, artists, genres } = data;
    return (
      <>
        <div className="flex items-center justify-between ">
          <span className="isolate flex-none inline-flex">
            <button
              type="button"
              className={`${
                category == "songs"
                  ? "text-orange-500"
                  : "text-gray-900 dark:text-neutral-50"
              } -mb-px sm:mb-0 relative inline-flex items-center rounded-tl-md bg-white dark:bg-slate-900  dark:hover:bg-slate-600 px-3 py-2 text-xs sm:text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:ring-slate-700`}
              onClick={() => setCategory(Categories.SONGS)}
            >
              Songs
            </button>
            <button
              type="button"
              className={`${
                category == "artists"
                  ? "text-orange-500"
                  : "text-gray-900 dark:text-neutral-50"
              } -mb-px sm:mb-0 relative -ml-px inline-flex items-center bg-white px-3 py-2 text-xs sm:text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-slate-900 dark:hover:bg-slate-600 dark:ring-slate-700`}
              onClick={() => setCategory(Categories.ARTISTS)}
            >
              Artists
            </button>
            <button
              type="button"
              className={`${
                category == "genres"
                  ? "text-orange-500"
                  : "text-gray-900 dark:text-neutral-50"
              } -mb-px sm:mb-0 relative -ml-px inline-flex items-center rounded-tr-md bg-white px-3 py-2 text-xs sm:text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-slate-900 dark:hover:bg-slate-600  dark:ring-slate-700`}
              onClick={() => setCategory(Categories.GENRES)}
            >
              Genres
            </button>
          </span>
          <span className="hidden sm:inline-block flex-2 text-[15px] sm:text-md font-semibold text-gray-900 dark:text-neutral-50 sm:-ml-3">
            Leaderboard
          </span>
          <span className="flex-none">
            <button
              type="button"
              className="hidden relative active:text-orange-500 dark:active:text-orange-500 sm:inline-flex items-center rounded-tr-md rounded-tl-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-slate-900 dark:text-neutral-50 dark:hover:bg-slate-600 dark:ring-slate-700"
              onClick={refetch as any}
            >
              Refresh
            </button>
            <button
              type="button"
              className="inline-flex sm:hidden relative items-center rounded-tr-md rounded-tl-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 dark:bg-slate-900 dark:text-neutral-50 dark:hover:bg-slate-600 dark:ring-slate-700"
              onClick={refetch as any}
            >
              <ArrowPathIcon className="active:text-orange-500 h-4 w-auto"/>
            </button>
          </span>
        </div>

        <div className="overflow-y-auto max-h-[74vh]">
          {category === Categories.SONGS ? (
            <List items={songs} title={"genres"} />
          ) : (
            <></>
          )}
          {category === Categories.ARTISTS ? (
            <List items={artists} title={"genres"} />
          ) : (
            <></>
          )}
          {category === Categories.GENRES ? (
            <List items={genres} title={"genres"} />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  } else {
    return <WidgetError />;
  }
};

export default TopItems;
