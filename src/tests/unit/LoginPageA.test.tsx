import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPageBeta from "@components/pages/LoginPage";

describe("LoginPageA", () => {
  beforeEach(() =>
    render(
      <BrowserRouter>
        <LoginPageBeta />
      </BrowserRouter>
    )
  );
  test("Page initially renders signin form", async () => {
    const heading = await screen.findByRole("heading", { name: "Sign In" });
    expect(heading).toContainHTML("Sign In");
  });
  test("Page can switch to signup form", async () => {
    const button = await screen.findByRole("button", { name: "Sign Up" });
    fireEvent.click(button);
    const heading = await screen.findByRole("heading", { name: "Sign Up" });
    expect(heading).toContainHTML("Sign Up");
  });
  test("Page can switch to forgot form", async () => {
    const button = await screen.findByRole("button", { name: "Forgot" });
    fireEvent.click(button);
    const heading = await screen.findByRole("heading", { name: "Password Recovery" });
    expect(heading).toContainHTML("Password Recovery");
  });
  test("Page redirects user to dashboard if already signed in", async () => {
    
  });
});
