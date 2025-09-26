import foods from "./data/foods";
import FoodCard from "./components/FoodCard";
import { Search, CircleX } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <div className="w-[80%] mx-auto">
        <div className="flex items-center justify-center border-2 border-gray-300 dark:border-gray-400 rounded-xl shadow-xl p-2 gap-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
          <Search className="text-gray-400/90" size={25} />
          <input
            type="text"
            placeholder="ابحث عن الطعام..."
            className="border-none outline-none w-full text-gray-900 dark:text-white"
          />
          <CircleX className="text-gray-400/90" size={25} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 p-6">
        {foods.map((item) => (
            <FoodCard key={item.id} food={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;