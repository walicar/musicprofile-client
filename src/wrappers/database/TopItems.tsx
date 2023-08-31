import React, { useEffect, useState } from "react";
import TopItemsWrapper from "./TopItemsWrapper";
import { TokenWrapper } from "./TokenWrapper";
import ServerWrapper from "@server/ServerWrapper";
import { useQuery } from "react-query";
import Loading from "@components/Loading";
import List from "@components/List";
import Error from "@components/Error";
import { validate } from "@utils/util";
import useLocalStorageState from "use-local-storage-state";
const ID = import.meta.env.VITE_SUPABASE_ID;

type Prop = {
  type: string;
};

const Categories = {
  SONGS: "songs",
  ARTISTS: "artists",
  GENRES: "genres",
};

let initialized = false;
const TopItems: React.FC<Prop> = ({ type }) => {
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
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
      return msg;
    },
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    const handleUpdate = async () => {
      console.log("Handlign Update");
      const topitems = new TopItemsWrapper(
        session.access_token,
        session.user.id
      );
      const lastUpdated = await topitems.getLastUpdated(type);
      const updateAt = new Date(lastUpdated);
      updateAt.setDate(updateAt.getDate() + 1);
      if (updateAt < new Date()) {
        console.log("send update here");
        const tokens = new TokenWrapper(session.access_token, session.user.id);
        await validate(tokens.validateTokens, [type], { [type]: setToken });
        const server = new ServerWrapper(session.access_token);
        const message = await server.postUpdate({
          spotify: token.access_token,
        });
        console.log(message);
      }
    };
    if (!initialized && token) {
      handleUpdate();
      initialized = true;
    }
  }, [session, token]);

  if (status === "loading") {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (status === "success") {
    const { songs, artists, genres } = data;
    return (
      <>
        <div className="flex items-center justify-center">
          <span className="isolate flex-none inline-flex">
            <button
              type="button"
              className="relative inline-flex items-center rounded-tl-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={() => setCategory(Categories.SONGS)}
            >
              Songs
            </button>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={() => setCategory(Categories.ARTISTS)}
            >
              Artists
            </button>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center rounded-tr-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={() => setCategory(Categories.GENRES)}
            >
              Genres
            </button>
          </span>
          <span className="flex-grow"></span>
          <span className="flex-none">
            <button
              type="button"
              className="relative inline-flex items-center rounded-tr-md rounded-tl-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={refetch as any}
            >
              Refresh  
            </button>
          </span>
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
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
  }

  if (error) {
    return <Error message={error} />;
  } else {
    return <Error />;
  }
};

export default TopItems;
