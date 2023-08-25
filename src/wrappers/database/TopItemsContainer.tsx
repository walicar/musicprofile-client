import React, { useEffect } from "react";
import TopItemsWrapper from "./TopItemsWrapper";
import { TokenWrapper } from "./TokenWrapper";
import ServerWrapper from "@server/ServerWrapper";
import { useQuery } from "react-query";
import Loading from "@components/Loading";
import List from "@components/List";
import Error from "@components/Error";
import { isEmpty } from "@utils/util";
import useLocalStorageState from "use-local-storage-state";
const ID = import.meta.env.VITE_SUPABASE_ID;

type Prop = {
  type: string;
};

let initialized = false;
const TopItemsContainer: React.FC<Prop> = ({ type }) => {
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [token, setToken]: any = useLocalStorageState(`${type}-token`)
  const topitems = new TopItemsWrapper(session.access_token, session.user.id);
  const tokens = new TokenWrapper(session.access_token, session.user.id);
  const server = new ServerWrapper(session.access_token, session.user.id);
  const { status, error, data }: any = useQuery(
    `${type}_topitems`,
    async () => {
      return await topitems.getTopItems(type, ["songs", "artists", "genres"]);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    const handleUpdate = async () => {
      console.log("Handlign Update");
      const lastUpdated = await topitems.getLastUpdated(type);
      const updateAt = new Date(lastUpdated);
      updateAt.setDate(updateAt.getDate() + 1);
      if (updateAt < new Date()) {
        console.log("send update here");
        const newTokens = await tokens.validateTokens(["spotify"]);
        if (!isEmpty(newTokens)) {
          setToken(newTokens["spotify"]);
        }
        const message = await server.postUpdate({spotify: token.access_token});
        console.log(message)
      }
    };
    if (!initialized) {
      handleUpdate();
      initialized = true;
    }
  }, []);

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
        <h2>Your {type} Top Items!</h2>
        <h3>songs</h3>
        <List items={songs} title={"songs"} />
        <h3>artists</h3>
        <List items={artists} title={"artists"} />
        <h3>genres</h3>
        <List items={genres} title={"genres"} />
      </>
    );
  }

  if (error) {
    return <Error message={error} />;
  } else {
    return <Error />;
  }
};

export default TopItemsContainer;
