const FoodCard = ({ food }) => {
  return (
    <div className="bg-white dark:bg-gray-800/90 shadow-lg rounded-2xl p-4 w-64 transition-colors duration-300 border border-gray-200/90 dark:border-gray-700">
      <img
        src={food.image}
        alt={food.name}
        width={250}
        height={150}
        className="rounded-xl mx-auto"
      />
      <h2 className="text-gray-900 dark:text-white text-lg font-bold mt-2">
        {food.name}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm h-10 overflow-hidden">{food.description}</p>
      <div className="w-full max-w-xs mx-auto h-px bg-gray-400/90 dark:bg-white/20 my-2"></div>
      <span className="text-sm text-green-700 dark:text-green-400 line-clamp-2">
       ✅ صحي ل {food.beneficialFor.join("، ")}
      </span>
    </div>
  );
};

export default FoodCard;