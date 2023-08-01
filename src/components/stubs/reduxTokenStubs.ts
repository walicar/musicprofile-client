export const refreshHandlerSTUB: any = {
  spotify: () => {
    console.log("spotify");
    return {
      access_token: "A_SPOTIFY_ACCESS_TOKEN",
      refresh_token: "A_SPOTIFY_REFRESH_TOKEN",
      expires_in: 4242,
    };
  },
  lasfm: () => {
    console.log("lasftm");
    return {
      access_token: "A_LASTFM_ACCESS_TOKEN",
      refresh_token: "A_LASTFM_REFRESH_TOKEN",
      expires_in: 4242,
    };
  },
};

export const saveRefreshTokenSTUB = (token: any) => {
  console.log("attempting to write Refresh Token to DB", token);
};

export const isExpiredSTUB = (token: any) => {
  console.log("attempting check if this token is expired", token);
  return true;
};
