import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import FoodCard from "./components/FoodCard";
import { Search, CircleX } from 'lucide-react';
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n, ready } = useTranslation();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const lang = i18n.language === "ar" ? "ar" : "en";

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodsCol = collection(db, "foods");
        const snapshot = await getDocs(foodsCol);
        const foodList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFoods(foodList);
        setFilteredFoods(foodList);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = foods.filter(food => {
      const name = food.name?.[lang]?.toLowerCase() || "";
      const beneficial = (food.beneficialFor?.[lang] || []).join(" ").toLowerCase();
      const category = food.category?.[lang]?.toLowerCase() || "";
      return name.includes(query) || beneficial.includes(query) || category.includes(query);
    });
    setFilteredFoods(filtered);
  }, [searchQuery, foods, lang]);

  if (!ready || loading) return <p className="text-center text-black dark:text-white mt-10">{t("loading")}</p>;

  return (
    <div className="w-[90%] mx-auto">

      <div className="flex items-center justify-center border-2 border-gray-300 dark:border-gray-400 rounded-xl shadow-xl p-2 gap-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all mb-6">
        <Search className="text-gray-400/90" size={25} />
        <input
          type="text"
          placeholder={t("searchFood")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none outline-none w-full text-gray-900 dark:text-white"
        />
        {searchQuery && (
          <CircleX className="text-gray-400/90 cursor-pointer" size={25} onClick={() => setSearchQuery("")} />
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 p-6">
        {filteredFoods.length > 0 ? (
          filteredFoods.map(food => <FoodCard key={food.id} food={food} />)
        ) : (
          <p className="text-gray-500 dark:text-gray-400">{t("noResults")}</p>
        )}
      </div>
    </div>
  );
};

export default Home;