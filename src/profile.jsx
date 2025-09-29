import { useAuth } from "./contexts/authContext";
import { Navigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { useEffect, useState } from "react";
import { dosignout } from "./Firebase/auth";
import FoodCard from "./components/FoodCard";

const Profile = () => {
  const { userLoggedIn, currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); 

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
    <div>
      <h1>Welcome {userData?.name || "User"} 👋</h1>
      <p>Email: {currentUser.email}</p>

      <h2>Favorites</h2>
      {loading ? (
        <p>Loading favorites...</p>
      ) : favorites.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {favorites.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <p>No favorites yet</p>
      )}

      <button onClick={dosignout}>Log Out</button>
    </div>
  );
};

export default Profile;
