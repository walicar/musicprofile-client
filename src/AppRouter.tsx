import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SettingsPage from "./pages/SettingsPage";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage content="My Content" />}></Route>
                <Route path="/signin" element={<SignInPage content="Sign In Content" />}></Route>
                <Route path="/settings" element={<SettingsPage content="Settings Content" />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter
