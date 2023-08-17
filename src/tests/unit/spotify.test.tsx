import { render, screen } from "@testing-library/react";
import SpotifyButton from "../../services/spotify/SpotifyButton";
import * as useLocalStorageStateModule from "use-local-storage-state";
import store from "../../app/store";
import { describe, test, vi } from "vitest";
import { Provider } from "react-redux";

/**
 * Test items in src/services/spotify
 * ----------------------------------
 * Run this test: npm test src/tests/unit/spotify.test.tsx
 *
 * Goal:
 * - test component individually
 *
 * Targets:
 * - SpotifyButton
 *
 * Notes:
 * since the spotify files are so intertwined, automated
 *   testing via playwright will paint a better picture on
 *   the state of project.
 *
 * So spotify services might be actually tested in playwright
 * we might want to rename this to serviceButton.test.tsx
 * later, because we can abstract all the service buttons
 * and put the setup logic in a hashmap, i.e.
 * `serviceButton["spotify"]()`
 */

describe("testing spotify button", () => {
  test("show 'connect' button when there is no spotify access-token", async () => {
    render(
      <Provider store={store}>
        <SpotifyButton />
      </Provider>
    );
    const buttonName = "connect to spotify";
    const connectButton = await screen.findByRole("button", {
      name: buttonName,
    });
    expect(connectButton).toContainHTML(buttonName);
  });

  test("show 'disconnect' button where there is a spotify access-token", async () => {
    const token = "my-fake-token";
    /*
    const mock = jest.spyOn(useLocalStorageStateModule, "default");
    mock.mockReturnValue([token, jest.fn() as any, jest.fn() as any]);
    */
    const spy = vi.spyOn(useLocalStorageStateModule, "default");
    spy.mockReturnValue([token, vi.fn() as any, vi.fn() as any])

    render(
      <Provider store={store}>
        <SpotifyButton />
      </Provider>
    );

    const buttonName = "disconnect from spotify";
    const disconnectButton = await screen.findByRole("button", {
      name: buttonName,
    });
    expect(disconnectButton).toContainHTML(buttonName);
    spy.mockRestore();
  });
});
