import foods from "./data/foods";
import FoodCard from "./components/FoodCard";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      {foods.map((item) => (
        <FoodCard key={item.id} food={item} />
      ))}
    </div>
  );
};

export default Home;