import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import ResetPassword from "./resetPassword";

const App = () => {
  return (
    <main className="bg-gray-100/95 dark:bg-gray-900/95 min-h-screen transition-colors duration-300 pt-32">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </main>
  );
};

export default App;