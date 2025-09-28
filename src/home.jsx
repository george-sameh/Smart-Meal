import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import FoodCard from "./components/FoodCard";
import { Search, CircleX } from 'lucide-react';
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, ready } = useTranslation();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodsCol = collection(db, "foods");
        const snapshot = await getDocs(foodsCol);
        const foodList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoods(foodList);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (!ready || loading) {
    return <p className="text-center mt-10">{t("loading")}</p>;
  }

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex items-center justify-center border-2 border-gray-300 dark:border-gray-400 rounded-xl shadow-xl p-2 gap-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all mt-6">
        <Search className="text-gray-400/90" size={25} />
        <input
          type="text"
          placeholder={t("searchFood")}
          className="border-none outline-none w-full text-gray-900 dark:text-white"
        />
        <CircleX className="text-gray-400/90 cursor-pointer" size={25} />
      </div>

      <div className="flex flex-wrap justify-center gap-4 p-6">
        {foods.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Home;