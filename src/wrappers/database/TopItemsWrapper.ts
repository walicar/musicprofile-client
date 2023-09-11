const API = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_PUB;

export default class TopItemsWrapper {
  accessToken: string;
  id: string;
  constructor(accessToken: string, id: string) {
    this.accessToken = accessToken;
    this.id = id;
  }
  async getTopItems(type: string, items: string[]): Promise<any> {
    /** * get top items from a certain service, with specific columns
     * @example
     * getTopItems("spotify", "[songs, genres, artists]")
     */
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      apiKey: API_KEY!,
      "content-type": "application/json",
    };
    if (!items || items.length === 0 || !type)
      return { error: "bad input, ex: 'songs genres artists'" };
    const query = {
      query: `query {
          ${type}_topitemsCollection(filter: {id: {eq: "${this.id}"}}) {
            edges {
              node {
                id ${[...items].join(" ")}
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
    const res = await fetch(URL, opt);
    if (!res.ok) return { error: res.statusText };
    const { data } = await res.json();
    if (data[`${type}_topitemsCollection`].edges.length === 0) {
      return {};
    } else {
      return data[`${type}_topitemsCollection`].edges[0].node;
    }
  }

  async getLastUpdated(type: string): Promise<string> {
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      apiKey: API_KEY!,
      "content-type": "application/json",
    };
    const query = {
      query: `query {
            ${type}_topitemsCollection(filter: {id: {eq: "${this.id}"}}) {
              edges {
                node {
                  last_updated
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
    const res = await fetch(URL, opt);
    if (!res.ok) return "2222-01-01 12:00:00+00";
    const { data } = await res.json();
    if (data[`${type}_topitemsCollection`].edges.length === 0)
      return "2222-01-01 12:00:00+00";
    // we can find data.statusText to be Unauthorized, check this later;
    // shouldn't happen because we always verify tokens before sending a request
    return data[`${type}_topitemsCollection`].edges[0].node.last_updated;
  }
}
