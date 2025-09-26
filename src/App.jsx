import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import ResetPassword from "./resetPassword";
import VerifyEmail from "./verifyEmail";
import Profile from "./profile";

const App = () => {
  const location = useLocation();

  const centeredRoutes = ["/login", "/register", "/resetPassword", "/verifyEmail"];
  const isCentered = centeredRoutes.includes(location.pathname);

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
        </Routes>
      </div>
    </main>
  );
};

export default App;