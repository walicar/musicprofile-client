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
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

function AppRouter() {
  const [theme, setTheme]: any = useLocalStorageState("theme");

  useEffect(() => {
    if (!theme) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme("dark")
        } else {
          setTheme("light")
        }
    }

  }, [])

  return (
    <div className={theme}>
      <BrowserRouter>
        <Header />
        <div className="flex flex-col lg:h-[84vh]">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot" element={<ForgotPage />} />
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
