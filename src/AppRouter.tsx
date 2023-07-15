import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CallbackPage from "./pages/CallbackPage";
import ProfilePage from "./pages/ProfilePage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage content="My Content" />}></Route>
      <Route
        path="/login"
        element={<LogInPage content="Log In Content" />}
      ></Route>
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/settings"
        element={<SettingsPage content="Settings Content" />}
      ></Route>
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/error" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
