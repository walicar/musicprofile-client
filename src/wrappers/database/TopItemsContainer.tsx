import React, { useEffect } from "react";
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

let initialized = false;
const TopItemsContainer: React.FC<Prop> = ({ type }) => {
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const [token, setToken]: any = useLocalStorageState(`${type}-token`);
  const { status, error, data, refetch }: any = useQuery(
    [`${type}_topitems`, session],
    async () => {
      const topitems = new TopItemsWrapper(
        session.access_token,
        session.user.id,
      );
      const msg = await topitems.getTopItems(type, [
        "songs",
        "artists",
        "genres",
      ]);
      return msg;
    },
    { refetchOnWindowFocus: false },
  );

  useEffect(() => {
    const handleUpdate = async () => {
      console.log("Handlign Update");
      const topitems = new TopItemsWrapper(
        session.access_token,
        session.user.id,
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
    if (!initialized) {
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
        <h2>Your {type} Top Items!</h2>
        <h3>songs</h3>
        {songs ? <List items={songs} title={"genres"} /> : <p>No songs</p>}
        <h3>artists</h3>
        {artists ? (
          <List items={artists} title={"genres"} />
        ) : (
          <p>No artists</p>
        )}
        <h3>genres</h3>
        {genres ? <List items={genres} title={"genres"} /> : <p>No genre</p>}
        <button onClick={refetch as any}>Refetch</button>
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
