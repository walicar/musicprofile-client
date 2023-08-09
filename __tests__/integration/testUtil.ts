import { fireEvent, screen } from "@testing-library/react";

const signInUser = () => {
    const logInButton = screen.getByText('log in');
    fireEvent.click(logInButton);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const signInButton = screen.getByRole('button', {name: "Sign In"});

    fireEvent.change(emailInput, {target: {value: 'will@alicar.me'}});
    fireEvent.change(passwordInput, {target: {value: 'Password11'}});
    fireEvent.click(signInButton);
}

const signOutUser = () => {
    const logOutButton = screen.getByText(/log out/i);
    fireEvent.click(logOutButton);
}

export {signInUser, signOutUser}