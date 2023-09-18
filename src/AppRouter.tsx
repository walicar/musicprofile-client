import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import LoginPage from "./components/pages/LoginPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import SettingsPage from "./components/pages/SettingsPage";
import CallbackPage from "./components/pages/CallbackPage";
import SignupPage from "@components/pages/SignupPage";
import ForgotPage from "@components/pages/ForgotPage";
import Header from "@components/navbar/Header";
import Footer from "@components/navbar/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PrivacyPage from "@components/pages/PrivacyPage";
import { useCookies } from "react-cookie";
import { CookieConfig } from "@utils/cookies";

function AppRouter() {
  const [cookies, setCookie]: any = useCookies(["theme"]);

  useEffect(() => {
    if (!cookies.theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setCookie("theme", "dark", CookieConfig);
      } else {
        setCookie("theme", "light", CookieConfig);
      }
    }
  }, [cookies, setCookie]);

  return (
    <div className={cookies.theme}>
      <Helmet>
        <body
          className={
            cookies.theme === "dark" ? "bg-slate-900 dark" : "bg-white"
          }
        ></body>
      </Helmet>
      <BrowserRouter>
        <Header />
        <div className="dark:bg-slate-900 dark:text-neutral-50 flex flex-col min-h-[84vh]">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot" element={<ForgotPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/callback/*" element={<CallbackPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
