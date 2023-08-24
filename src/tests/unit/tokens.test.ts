import { describe, test, expect } from "vitest";
import { tokenToService } from "../../utils/tokens";

describe("Testing token functions", () => {
  test("tokenToService: convert TokenCollection to ServiceTokens", () => {
    const tokenCollection: any = {
      spotify: JSON.stringify({
        access_token: "my-spotify-access-token",
        expires_in: 3600,
        created_at: Date(),
      }),
      lastfm: JSON.stringify({
        access_token: "my-lastfm-access-token",
        expires_in: 3600,
        created_at: Date(),
      }),
    };
    const expected: ServiceTokens = {
      spotify: "my-spotify-access-token",
      lastfm: "my-lastfm-access-token",
    };
    const result = tokenToService(tokenCollection);
    expect(result).toEqual(expected);
  });
});
