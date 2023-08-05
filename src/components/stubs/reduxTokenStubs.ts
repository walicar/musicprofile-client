export const refreshHandlerSTUB: any = {
  spotify: async () => {
    const promise = new Promise((resolve, _reject) => {
      setTimeout(() => {
        console.log("attempting to get a spotify token from third party");
        resolve({
          access_token: "A_SPOTIFY_ACCESS_TOKEN",
          refresh_token: "A_SPOTIFY_REFRESH_TOKEN",
          expires_in: 4242,
        });
      }, 1000);
    });
    return promise;
  },
  lasfm: async () => {
    const promise = new Promise((resolve, _reject) => {
      setTimeout(() => {
        console.log("attempting to get a lastfm token from third party");
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

export const saveRefreshTokenSTUB = async (token: any) => {
  const promise = new Promise((resolve, _reject) => {
    setTimeout(() => {
      console.log("attempting to write Refresh Token to DB", token);
      resolve("mockPromise resolved in 1s");
    }, 1000);
  });
  return promise;
};

export const isExpiredSTUB = async (token: any) => {
  console.log("attempting check if this token is expired", token);
  return true;
};
