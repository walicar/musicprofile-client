import { render, screen } from "@testing-library/react";
import SpotifyButton from "../../services/spotify/SpotifyButton";
import * as useLocalStorageStateModule from "use-local-storage-state";

/**
 * Test items in src/services/spotify
 * ----------------------------------
 * Run this test: npm test src/tests/unit/spotify.test.tsx
 *
 * Goal:
 * - test components
 * - and util service functions
 *
 * Targets:
 * -
 *
 */

describe("testing spotify button", () => {
  test("show 'connect' button when there is no spotify access-token", async () => {
    render(<SpotifyButton />);
    const buttonName = "connect to spotify";
    const connectButton = await screen.findByRole("button", {
      name: buttonName,
    });
    expect(connectButton).toContainHTML(buttonName);
  });

  test("show 'disconnect' button where there is a spotify access-token", async () => {
    const token = "my-fake-token"
    const mock = jest.spyOn(useLocalStorageStateModule, 'default')
    mock.mockReturnValue([token, jest.fn() as any, jest.fn() as any]);
    render(<SpotifyButton />);
    const buttonName = "disconnect from spotify";
    const disconnectButton = await screen.findByRole("button", {
      name: buttonName,
    });
    expect(disconnectButton).toContainHTML(buttonName);
    mock.mockRestore();
  });
});
