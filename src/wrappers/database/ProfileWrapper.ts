const API = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPBASE_PUB;

export class ProfileWrapper {
  accessToken: string;
  id: string;
  constructor(_accessToken: string, _id: string) {
    this.accessToken = _accessToken;
    this.id = _id;
  }

  async getTitle() {
    console.log("getTitle Fetch caleld")
    const apiUrl = API + "/rest/v1/profiles";
    const queryParams = `id=eq.${this.id}&select=title`;
    const requestUrl = `${apiUrl}?${queryParams}`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
      apiKey: API_KEY!,
      "content-profile": "public",
      prefer: "return=representation",
    };
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: headers,
    });
    console.log(response.statusText);
    const data = await response.json();
    console.log(data[0].title)
    return data[0].title
  }
}
