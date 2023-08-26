import { render, screen } from "@testing-library/react";
import SpotifyButton from "../../services/spotify/SpotifyButton";
import { vi, describe, test } from "vitest";

describe("testing spotify button", () => {
  test("show 'disconnect' button where there is a spotify access-token", async () => {
    vi.mock("use-local-storage-state", () => ({
      __esModule: true,
      default: () => [
        { access_token: "mock", expires_in: 3600, created_at: "my-date" },
        vi.fn(),
        vi.fn(),
      ],
    }));
    render(<SpotifyButton />);
    const buttonName = "disconnect from spotify";
    const disconnectButton = await screen.findByRole("button", {
      name: buttonName,
    });
    expect(disconnectButton).toContainHTML(buttonName);
  });
});
