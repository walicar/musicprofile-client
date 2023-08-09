import App from "../../App";
import store from "../../app/store";
import { Provider } from "react-redux";
import { render, screen, act} from "@testing-library/react";
import { signInUser, signOutUser } from "./testUtil";
const ID = process.env.REACT_APP_SUPABASE_ID;

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
 */

describe("authentication integration: log in and log out", () => {
  let app: any;

  beforeEach(() => {
    app = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(async () => {
    app.unmount();
  })

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
  })
  
  test("logging out deletes user session", async () => {
    await signOutUser(app);
    const localStorageKey = `sb-${ID}-auth-token`;
    const userSession = localStorage.getItem(localStorageKey);
    expect(userSession).toBeFalsy();
  })

  test("logging out takes you to home page", async () => {
    const home = await screen.findByRole("heading", {
      name: /Home/i,
    });
    expect(home).toContainHTML("Home");
  })

});
