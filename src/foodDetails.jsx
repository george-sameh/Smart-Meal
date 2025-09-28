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

  if (!food) return <p className="text-center mt-10">{t("loading")}</p>;

  const lang = i18n.language === "ar" ? "ar" : "en";

  const name = food.name?.[lang] || "Loading Name...";
  const description = food.description?.[lang] || "Loading Description...";
  const beneficial = food.beneficialFor?.[lang] || [];
  const harmful = food.harmfulFor?.[lang] || [];

  return (
    <div>
      <h1>{name}</h1>
      <img src={food.image} alt={name} />
      <p>{description}</p>

      <div>
        <span>
          {lang === "ar" ? "✅ صحي ل:" : "✅ Beneficial for:"}
        </span>
        <p>{beneficial.join(lang === "ar" ? "، " : ", ")}</p>
      </div>

      <div>
        <span>
          {lang === "ar" ? "❌ ضار ل:" : "❌ Harmful for:"}
        </span>
        <p>{harmful.join(lang === "ar" ? "، " : ", ")}</p>
      </div>
    </div>
  );
};

export default FoodDetails;