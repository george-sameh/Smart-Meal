import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const FoodDetails = () => {
  const { id } = useParams(); 
  const [ food, setFood ] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchFood = async () => {
      const docRef = doc(db, "foods", id.toString()); 
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFood({ id: docSnap.id, ...docSnap.data() });
      }
    };

    fetchFood();
  }, [id]);

  if (!food) return <p className="text-center text-black dark:text-white mt-10">{t("loading")}</p>;

  const lang = i18n.language === "ar" ? "ar" : "en";

  const name = food.name?.[lang] || t("loadingName");
  const description = food.description?.[lang] || t("loadingDescription");
  const beneficial = food.beneficialFor?.[lang] || [];
  const harmful = food.harmfulFor?.[lang] || [];
  const category = food.category?.[lang] || t("loadingCategory");

  return (
    <div className="p-6 w-full">
      <div className="bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 border border-gray-300 dark:border-gray-700 text-black dark:text-white shadow-lg rounded-xl p-6">

        {food.image && (
          <img
            src={food.image}
            alt={name}
            className={`w-full md:w-1/2 h-72 md:h-96 object-cover rounded-xl shadow-lg mb-4 mt-10 ${lang === "ar" ? "float-left mr-6" : "float-right ml-6"}`} />
        )}

        <h1 className={`text-3xl ${lang === "ar" ? "text-right" : "text-left"} font-bold text-gray-900 dark:text-white mb-4`}>
          {name}
        </h1>

        <p className={`text-sm text-blue-600 dark:text-blue-400 font-medium mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
          {lang === "ar" ? "📂 الفئة:" : "📂 Category:"} {category}
        </p>

        <p className={`text-gray-700 dark:text-gray-300 mb-6 leading-relaxed ${lang === "ar" ? "text-right" : "text-left"}`}>
          {description}
        </p>

        {beneficial?.length > 0 && (
          <div className={`mb-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="font-semibold text-green-600 dark:text-green-400">
              {lang === "ar" ? "✅ صحي لمرضي:" : "✅ Beneficial for:"}
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300">
              {beneficial.join(lang === "ar" ? "، " : ", ")}
            </p>
          </div>
        )}

        {harmful?.length > 0 && (
          <div className={`mb-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="font-semibold text-red-600 dark:text-red-400">
              {lang === "ar" ? "❌ ضار لمرضي:" : "❌ Harmful for:"}
            </h2>

            <p className="text-gray-700 dark:text-gray-300">
              {harmful.join(lang === "ar" ? "، " : ", ")}
            </p>
          </div>
        )}

        <div className="clear-both"></div>
      </div>
    </div>
  );
};

export default FoodDetails;