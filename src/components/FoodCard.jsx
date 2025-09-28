import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FoodCard = ({ food }) => {
  const { i18n } = useTranslation();

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-2xl p-4 w-64 transition-colors duration-300 border border-gray-300 dark:border-gray-700 text-black dark:text-white">
      
      <div className='relative'>
        <img
          src={food.image}
          alt={food.name[i18n.language]}
          width={250}
          height={150}
          className="rounded-xl mx-auto"
        />

        <button className={`absolute bottom-3 ${i18n.language === 'ar' ? 'left-3' : 'right-3'}`}>
          <Heart className="w-6 h-6 text-white/90" />
        </button>
      </div>

      <h2 className="text-gray-900 dark:text-white text-lg font-bold mt-2">
        {food.name[i18n.language]}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm h-10 overflow-hidden">
        {food.description[i18n.language]}
      </p>

    <div className="w-full max-w-xs mx-auto h-px bg-gray-400/90 dark:bg-white/20 my-2"></div>
      <span className="text-sm text-green-700 dark:text-green-400 line-clamp-2">
        {i18n.language === 'ar' ? '✅ صحي ل' : '✅ Beneficial for'} {food.beneficialFor[i18n.language].join(i18n.language === 'ar' ? '، ' : ', ')}
      </span>
    </div>
  );
};

export default FoodCard;
