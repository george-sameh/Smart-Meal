import { Search, Menu, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
    } catch (error) {
      console.warn("Could not access localStorage:", error);
      return false;
    }
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    htmlElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <header
      className={`w-full fixed top-0 z-50 flex justify-between items-center text-white py-6 px-8 md:px-32 transition-all duration-300
        ${isDarkMode ? "bg-gray-900/80 border-b-2 border-b-gray-800" : "bg-gradient-to-l from-green-700/95 to-sky-700/95"}`}
    >
      <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-all">
        <img src="/logo.png" alt="Smart Meal Logo" className="w-12 h-12" />
        <span className="text-green-400 text-lg font-bold">وجبة ذكية</span>
      </Link>

      <ul className="hidden lg:flex items-center gap-10 font-semibold text-base">
        <li>
          <Link
            to="/"
            className="p-3 block hover:bg-indigo-400 dark:hover:bg-indigo-500 text-white rounded-lg transition-all hover:shadow-lg"
          >
            الرئيسية
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="p-3 block hover:bg-indigo-400 dark:hover:bg-indigo-500 text-white rounded-lg transition-all hover:shadow-lg"
          >
            حسابي
          </Link>
        </li>
      </ul>

      <div className="relative hidden md:flex items-center justify-center gap-3">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
        <input
          type="text"
          placeholder="البحث..."
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          className={`rounded-xl py-2 pr-10 text-white border-blue-300 focus:bg-slate-600 focus:outline-sky-500 transition-all ${
            isDarkMode ? "bg-gray-800" : "bg-white/30 border-white/40"
          }`}
        />
      </div>

      <div
        className="hidden lg:flex items-center group hover:scale-105 transition-all p-2 rounded-lg cursor-pointer hover:bg-white/25"
        onClick={toggleTheme}
      >
        {isDarkMode ? <Sun className="text-amber-400" /> : <Moon className="text-blue-200" />}
      </div>

      <div className="lg:hidden flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Menu className="w-8 h-8 text-gray-300 cursor-pointer" />
      </div>

      <div
        className={`${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } absolute top-full left-0 text-white w-full shadow-lg flex flex-col items-center gap-4 py-4 lg:hidden font-semibold text-lg transition-opacity duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-700"
        }`}
      >
        <ul className="w-full flex flex-col items-center">
          <li className="w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all">
            <Link to="/" className="block w-full">
              الرئيسية
            </Link>
          </li>
          <li className="w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all">
            <Link to="/login" className="block w-full">
              حسابي
            </Link>
          </li>
        </ul>

        <div className="w-full max-w-xs mx-auto h-px bg-white/20 my-2 block lg:hidden"></div>

        <div className="relative flex md:hidden items-center justify-center w-11/12">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            placeholder="البحث..."
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className={`rounded-xl w-full py-2 pr-10 text-white border-2 border-blue-300 focus:bg-slate-500 focus:outline-sky-500 transition-all ${
              isDarkMode ? "bg-gray-800" : "bg-gray-700"
            }`}
          />
        </div>

        <button
          onClick={toggleTheme}
          className="items-center justify-center flex gap-3 text-white px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all w-11/12"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-5 h-5 relative top-[0.5px] text-amber-400" />
              <span className="leading-none">الوضع الفاتح</span>
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 relative top-[0.5px] text-blue-300" />
              <span className="leading-none">الوضع الداكن</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
