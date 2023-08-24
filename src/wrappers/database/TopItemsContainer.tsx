import React from "react";
import TopItemsWrapper from "./TopItemsWrapper";
import { useQuery } from "react-query";
import Loading from "@components/Loading";
import List from "@components/List";
import Error from "@components/Error";
import useLocalStorageState from "use-local-storage-state";
const ID = import.meta.env.VITE_SUPABASE_ID

type Prop = {
    type: string
}
const TopItemsContainer: React.FC<Prop> = ({ type }) => {
  // const supabase: SupabaseClient<any> = useSupabaseClient();
  const [session]: any = useLocalStorageState(`sb-${ID}-auth-token`);
  const db = new TopItemsWrapper(session.access_token, session.user.id);
  // need to useEffect to subscribe to updates, check devlog
  const { status, error, data }: any = useQuery(
    `${type}_topitems`,
    async () => {
      return await db.getTopItems(type, ["songs", "artists", "genres"]);
    },
    { refetchOnMount: false },
  );

  if (status === "loading") {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (status === "success") {
    const {songs, artists, genres } = data;
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
