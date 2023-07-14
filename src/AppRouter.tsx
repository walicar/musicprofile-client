import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SettingsPage from "./pages/SettingsPage";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage content="My Content" />}></Route>
                <Route path="/login" element={<LogInPage content="Log In Content" />}></Route>
                <Route path="/settings" element={<SettingsPage content="Settings Content" />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter
