import { fireEvent, act, waitFor } from "@testing-library/react";

const signInUser = async (app: any) => {
  const { getByLabelText, findByRole } = app;
  const logInButton = await findByRole("button", { name: "log in" });
  fireEvent.click(logInButton);
  const emailInput = getByLabelText("Email:");
  const passwordInput = getByLabelText("Password:");
  const signInButton = await findByRole("button", { name: "Sign In" });

  fireEvent.change(emailInput, { target: { value: "will@alicar.me" } });
  fireEvent.change(passwordInput, { target: { value: "Password11" } });
  fireEvent.click(signInButton);
  const dashboard = await findByRole("heading", {
    name: /Dashboard/i,
  });
};

const signOutUser = async (app: any) => {
  const { findByRole } = app;
  const logOutButton = await findByRole("button", { name: "log out" });
  fireEvent.click(logOutButton);
  const home = await findByRole("heading", { name: /Home/i });
};

export { signInUser, signOutUser };
