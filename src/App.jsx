import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import ResetPassword from "./resetPassword";
import VerifyEmail from "./verifyEmail";
import Profile from "./profile";
import FoodDetails from "./foodDetails";

const App = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  const centeredRoutes = ["/login", "/register", "/resetPassword", "/verifyEmail"];
  const isCentered = centeredRoutes.includes(location.pathname);

  useEffect(() => {
    document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  }, [i18n.language]);

  return (
    <main className={`bg-gray-100/95 dark:bg-gray-900/95 transition-colors duration-300 ${isCentered ? "pt-24" : "pt-32"}`}>
      <div
        className={
          isCentered
            ? "flex justify-center items-center min-h-[calc(100vh-6rem)]"
            : "min-h-[calc(100vh-8rem)]"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/food/:id" element={<FoodDetails />} /> 
        </Routes>
      </div>
    </main>
  );
};

export default App;