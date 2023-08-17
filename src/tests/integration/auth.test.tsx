import App from "../../App";
import store from "../../app/store";
import { Provider } from "react-redux";
import { render, screen, act } from "@testing-library/react";
import { signInUser, signOutUser } from "./testUtil";
const ID = import.meta.env.VITE_SUPABASE_ID;

/**
 * Targets:
 * - Authentication functionality
 * - Log In
 * - Log Out
 * - Sign Up
 * - Forgot Password
 *
 * Testcases:
 * - TODO
 * - logout from any other page routes you back to /home page
 *
 * Notes:
 * these are mostly just testing implementation and nt how it is used
 * WILL need to refactor, although, this file may be good
 * when we need to actually test how things are rendered
 * when we start designing the UI.
 *
 * So you might want to delete the tests for usersession,
 * but leave in the ones that test redirect
 *
 * Remember, test what the user would expect, not the underlying
 * mechanism
 *
 */

describe("authentication integration: log in and log out", () => {
  let app: any;

  beforeEach(() => {
    app = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  afterEach(async () => {
    app.unmount();
  });

  test("logging in creates a user session", async () => {
    await signInUser(app);
    // wait for dashboard screen for localStorage to be updated
    const localStorageKey = `sb-${ID}-auth-token`;
    const userSession = localStorage.getItem(localStorageKey);
    expect(userSession).toBeTruthy();
  });

  test("logging in takes you dashboard page", async () => {
    const dashboard = await screen.findByRole("heading", {
      name: /Dashboard/i,
    });
    expect(dashboard).toContainHTML("Dashboard");
  });

  test("logging out deletes user session", async () => {
    await signOutUser(app);
    const localStorageKey = `sb-${ID}-auth-token`;
    const userSession = localStorage.getItem(localStorageKey);
    expect(userSession).toBeFalsy();
  });

  test("logging out takes you to home page", async () => {
    const home = await screen.findByRole("heading", {
      name: /Home/i,
    });
    expect(home).toContainHTML("Home");
  });
});
