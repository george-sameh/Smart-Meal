import { Routes, Route } from "react-router-dom";
import foods from "./data/foods";
import FoodCard from "./components/FoodCard";
import Login from "./login";
import Register from "./register";

const App = () => {
  return (
    <main className="bg-gray-100/95 dark:bg-gray-900/95 min-h-screen transition-colors duration-300 pt-32">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-wrap justify-center gap-4 p-6">
              {foods.map((item) => (
                <FoodCard key={item.id} food={item} />
              ))}
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
};

export default App;