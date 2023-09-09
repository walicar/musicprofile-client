import { refreshSpotifyToken } from "@spotify/spotify.service";

export const refreshHandlers: any = {
  spotify: async (refreshToken: any) => {
    return await refreshSpotifyToken(refreshToken);
  },
  lasfm: async () => {
    // STUBBED
    console.warn("Usage of stub lastfm refresh handler");
    const promise = new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({
          access_token: "A_LASTFM_ACCESS_TOKEN",
          refresh_token: "A_LASTFM_REFRESH_TOKEN",
          expires_in: 4242,
        });
      }, 1000);
    });
    return promise;
  },
};
