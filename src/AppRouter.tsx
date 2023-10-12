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
import useLocalStorageState from "use-local-storage-state";

function AppRouter() {
  const [theme, setTheme]: any = useLocalStorageState("theme");

  useEffect(() => {
    if (document.body.style) document.body.removeAttribute("style");
    if (!theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, [theme, setTheme]);

  return (
    <div className={theme}>
      <Helmet>
        <body
          className={theme === "dark" ? "bg-slate-900 dark" : "bg-white"}
        ></body>
      </Helmet>
      <BrowserRouter>
        <div className="flex flex-col -mt-2 ">
          <Header />
          <div className="flex-grow sm:h-[83vh] dark:bg-slate-900 dark:text-neutral-50">
            <main>
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
        </div>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
