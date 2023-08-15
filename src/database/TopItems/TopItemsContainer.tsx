import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "../../contexts/SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";
import TopItemsManager from "./TopItemsManager";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import List from "../../components/List";
import Error from "../../components/Error";

let didInit = false;
const TopItemsContainer: React.FC = () => {
  // const supabase: SupabaseClient<any> = useSupabaseClient();
  const topItemsManager: TopItemsManager = new TopItemsManager();
  // need to useEffect to subscribe to updates, check devlog
  const { status, error, data }: any = useQuery(
    "topItems",
    async () => {
      return await topItemsManager.getTopItems("songs artists genres");
    },
    { refetchOnMount: false }
  );

  if (status === "loading") {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (status === "success") {
    const node = data.data.topitemsCollection.edges[0].node;
    return (
      <>
        <h2>Your Top Items!</h2>
        <h3>songs</h3>
        <List items={node.songs} title={"songs"}/>
        <h3>artists</h3>
        <List items={node.artists} title={"artists"}/>
        <h3>genres</h3>
        <List items={node.genres} title={"genres"}/>
      </>
    );
  }

  if (error) {
    return <Error message={error} />
  } else {
    return <Error />
  }
};

export default TopItemsContainer;
