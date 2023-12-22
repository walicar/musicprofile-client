import { render, screen } from "@testing-library/react";
import SpotifyButton from "@services/spotify/SpotifyButton";
import { describe, test } from "vitest";

describe("testing spotify button", () => {
  test("show 'connect' button when there is no spotify access-token", async () => {
    render(<SpotifyButton />);
    const buttonName = "Connect";
    const connectButton = await screen.findByRole("button", {
      name: buttonName,
    });
    expect(connectButton).toContainHTML(buttonName);
  });
});
