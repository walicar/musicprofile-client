import App from "../../src/App";
import store from "../../src/app/store";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { signInUser, signOutUser} from "./testUtil";
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

const app = render(
    <Provider store={store}>
      <App />
    </Provider>
);

describe("authentication integration: log in", () => {
  test("logging in creates a user session", async () => {
    signInUser();
    const dashboard = await screen.findByRole("heading", {name: /Dashboard/i});
    const localStorageKey = `sb-${ID}-auth-token`;
    const userSession = localStorage.getItem(localStorageKey);
    console.log(localStorage);
    expect(userSession).toBeTruthy();
  });
  test("logging out deletes the user session", async () => {
    signOutUser();
    const home = await screen.findByRole("heading", {name: /Home/i});
    
  })
});
