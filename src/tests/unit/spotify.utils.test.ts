import { describe, test, expect } from "vitest";
import { getSpotifyRecommendationUrl } from "@services/spotify/spotify.utils";

describe("Testing Spotify Utils", () => {
  test("getRecommendationUrl: return expected", () => {
    const data: TopItemColumns = {
      songs: [
        {
          name: "Song Name 1",
          status: "unchanged",
          artist: "Artist Name 1",
          id: "id1",
        },
        {
          name: "Song Name 2",
          status: "unchanged",
          artist: "Artist Name 2",
          id: "id2",
        },
      ],
      artists: [
        {
          name: "Artist Name 3",
          status: "unchanged",
          id: "id3",
        },
        {
          name: "Artist Name 4",
          status: "unchanged",
          id: "id4",
        },
      ],
      genres: [
        {
          name: "Genre 1",
          status: "unchanged",
        },
      ],
    };
    const result = getSpotifyRecommendationUrl(data);
    const expected =
      "https://api.spotify.com/v1/recommendations?limit=10&market=EG&seed_artists=id3%2Cid4&seed_tracks=id1";
    expect(result).toEqual(expected);
  });
});
