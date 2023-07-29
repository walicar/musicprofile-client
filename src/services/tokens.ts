import { createClient } from "@supabase/supabase-js";

const getTokens = async () => {
  const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
  const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
  const supabase = createClient(PROJECT_URL!, PUB_KEY!);
  try {
    const { data } = await supabase
      .from("tokens")
      .select("id, spotify, lastfm");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const writeTokens = async (id: any) => {
  const PROJECT_URL = process.env.REACT_APP_SUPABASE_URL;
  const PUB_KEY = process.env.REACT_APP_SUPABASE_PUB;
  const supabase = createClient(PROJECT_URL!, PUB_KEY!);
  const { data } = await supabase
    .from("tokens")
    .update({ spotify: "hello_there" })
    .eq("id", id)
    .select();
  console.log("wroteTokens: ", data);
};

export { getTokens, writeTokens };
