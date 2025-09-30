import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { db } from "../Firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const FoodCard = ({ food }) => {
  const { i18n, t } = useTranslation();
  const { currentUser } = useAuth();
  const [ isFav, setIsFav ] = useState(false);

  const lang = i18n.language === "ar" ? "ar" : "en";

  const name = food.name?.[lang] || t("loadingName");
  const description = food.description?.[lang] || t("loadingDescription");
  const beneficial = food.beneficialFor?.[lang] || [];

  useEffect(() => {
    const checkFavorite = async () => {
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const favs = userSnap.data().favorites || [];
        setIsFav(favs.includes(food.id));
      }
    };
    checkFavorite();
  }, [currentUser, food.id]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert(t("loginFirst"));

    const userRef = doc(db, "users", currentUser.uid);

    if (isFav) {
      await updateDoc(userRef, { favorites: arrayRemove(food.id) });
      setIsFav(false);
    } else {
      await updateDoc(userRef, { favorites: arrayUnion(food.id) });
      setIsFav(true);
    }
  };

  return (
    <Link to={`/food/${food.id}`}>
      <div className="bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-2xl p-4 w-64 transition-colors duration-300 border border-gray-300 dark:border-gray-700 text-black dark:text-white">
        
        <div className='relative'>
          <img
            src={food.image}
            alt={name}
            width={250}
            height={150}
            className="rounded-xl mx-auto"
          />

         <button
            onClick={toggleFavorite}
            className={`absolute bottom-3 ${lang === 'ar' ? 'left-3' : 'right-3'}`}
          >
            <Heart className={`w-6 h-6 ${isFav ? 'text-red-500' : 'text-white/90'}`} />
          </button>

        </div>

        <h2 className="text-gray-900 dark:text-white text-lg font-bold mt-2">
          {name}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm h-10 overflow-hidden">
          {description}
        </p>

        <div className="w-full max-w-xs mx-auto h-px bg-gray-400/90 dark:bg-white/20 my-2"></div>
        
        <span className="text-sm text-green-700 dark:text-green-400 line-clamp-2">
          {lang === 'ar' ? '✅ صحي ل' : '✅ Beneficial for'}{" "}
          {beneficial.join(lang === 'ar' ? '، ' : ', ')}
        </span>
      </div>
    </Link>
  );
};

export default FoodCard;