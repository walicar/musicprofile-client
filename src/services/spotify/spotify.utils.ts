export const getSpotifyRecommendationUrl = (data: TopItemColumns) => {
  const seed_tracks: string[] = data.songs.map((item) => item.id!);
  const seed_artists: string[] = data.artists.map((item) => item.id!);
  const url = new URL("https://api.spotify.com/v1/recommendations");
  const params = new URLSearchParams();
  params.append("limit", "10");
  params.append("market", "EG");
  params.append("seed_artists", seed_artists.slice(0, 4).join(","));
  params.append("seed_tracks", seed_tracks[0]);
  url.search = params.toString();
  return url.toString();
};
