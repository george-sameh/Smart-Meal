import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import ResetPassword from "./resetPassword";
import Profile from "./profile";

const App = () => {
  return (
    <main className="bg-gray-100/95 dark:bg-gray-900/95 transition-colors duration-300 pt-24">
      <div className="flex justify-center items-center min-h-[calc(100vh-6rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;