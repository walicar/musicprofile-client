import { test, expect, type Page } from "@playwright/test";

// this tests spotify, and redux store
// - connect to spotify
// - is access token saved in local storage (check if spotify button is rendered correctly )
// BLOCKED -> need to develop Spotify Recommend Component
// - require resource on an expired token.
// - require resource on an active token.

const signIn = async (page: Page) => {
  const loginButtonName = "log in";
  await page.getByRole("button", { name: loginButtonName }).click();
  await page.getByRole("textbox", { name: "Email:" }).fill("will@alicar.me");
  await page.getByRole("textbox", { name: "Password:" }).fill("Password11");
  await page.getByRole("button", { name: "Sign In" }).click();
};

test.describe("connect to a third party service", () => {
  test("signed in as a user", async ({ page }) => {
    await page.goto("http://localhost:3000");
    signIn(page);
    await expect(
      page.getByRole("heading", { name: "Welcome will@alicar.me" }),
    ).toBeVisible();
  });

  // BLOCKED
  test("check spotify recommend component", () => {
    // develop spotify recommend
    expect(true).toBeTruthy();
  });
});
