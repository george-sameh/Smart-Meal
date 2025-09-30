import { useAuth } from "./contexts/authContext";
import { Navigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { useEffect, useState } from "react";
import { dosignout } from "./Firebase/auth";
import FoodCard from "./components/FoodCard";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { userLoggedIn, currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      if (!userLoggedIn) return;

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);

          const favIds = data.favorites || [];

          if (favIds.length > 0) {
            const foodsRef = collection(db, "foods");
            const q = query(foodsRef, where("__name__", "in", favIds.map(String)));
            const querySnap = await getDocs(q);

            const favFoods = querySnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setFavorites(favFoods);
          }
        }
      } catch (err) {
        console.error("Error loading user data or favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (!userLoggedIn || !currentUser?.emailVerified) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t("welecome")} {userData?.name || "User"} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {t("email")}: {currentUser.email}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          ⭐ {t("favorites")}
        </h2>
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400 italic">{t("loadingFavorites")}</p>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">{t("noFavorites")}</p>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={dosignout}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition duration-200 cursor-pointer"
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default Profile;