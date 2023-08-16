const ID = import.meta.env.VITE_SUPABASE_ID;
const API = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUB;

export default class TopItemsManager {
  session: any;
  constructor() {
    const session = localStorage.getItem(`sb-${ID}-auth-token`);
    if (!session)
      throw Error("Trying create TopItems manager without beign signed in");
    this.session = JSON.parse(session);
  }
  async getTopItems(items: string) {
    /**
     * get certain columns from user's TopItems record
     * @example
     * getTopItems("songs genres artists")
     */
    const headers = {
      Authorization: `Bearer ${this.session.access_token}`,
      apiKey: API_KEY!,
      "content-type": "application/json",
    };
    if (!items) return { error: "bad input, ex: 'songs genres artists'" };
    const query = {
      query: `query {
        topitemsCollection(filter: {id: {eq: "${this.session.user.id}"}}) {
          edges {
            node {
              id ${items}
            }
          }
        }
      }`,
    };
    const opt = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(query),
    };
    const URL = API! + "/graphql/v1";
    const response = await fetch(URL, opt);
    const { data } = await response.json();
    if (data.topitemsCollection.edges.length === 0) {
      return {error: "No Records"}
    } else {
      return data.topitemsCollection.edges[0];
    }
  }
}
