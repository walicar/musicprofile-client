import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CallbackPage from "./pages/CallbackPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import AuthenticationGuard from "./components/AuthenticationGuard"

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage content="My Content" />}></Route>
      <Route path="/profile" element={<AuthenticationGuard component={ProfilePage}/>} />
      <Route path="/settings" element={<AuthenticationGuard component={SettingsPage}/>} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
