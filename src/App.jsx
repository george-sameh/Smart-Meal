import foods from "./data/foods";
import FoodCard from "./components/FoodCard";

const App = () => {
  return (
    <main className="bg-gray-100 dark:bg-gray-900/95 min-h-screen transition-colors duration-300">
      <div className="flex flex-wrap justify-center gap-4 p-6 pt-32">
        {foods.map((item) => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>
    </main>
  );
};

export default App;