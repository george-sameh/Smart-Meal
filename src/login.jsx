const Login = () => {

  return (
    <div className="pt-32 flex justify-center">
      <div className="bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 text-black dark:text-white p-10 rounded-2xl shadow-lg max-w-md w-full border border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center">تسجيل الدخول</h1>

        <form>
          <div className="my-4 text-right">
            <label htmlFor="email" className="block mb-2 font-semibold">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              dir="ltr"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
            />
          </div>

          <div className="my-4 text-right">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="font-semibold">
                كلمة السر
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                نسيت كلمة السر؟
              </a>
            </div>

            <input
              type="password"
              id="password"
              placeholder="********"
              dir="ltr"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            تسجيل الدخول
          </button>
        </form>
        
        <div className="text-center mt-4">
          <a href="/register" className="text-blue-500 hover:underline text-sm">ليس لديك حساب؟ إنشاء حساب</a>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-400">أو تابع باستخدام</span>
          </div>
        </div>

        <button
          className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
        >
          تسجيل الدخول باستخدام Google
        </button>
      </div>
    </div>
  );
};

export default Login;