const ResetPassword = () => {
  
  return (
    <div className="pt-32 flex justify-center">
      <div className="bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 text-black dark:text-white p-10 rounded-2xl shadow-lg max-w-md w-full border border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center">إعادة تعيين كلمة السر</h1>

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
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
            />
          </div>

          <button
            type="submit"
            className="w-full font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white">
            إعادة تعيين كلمة السر
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="text-blue-500 hover:underline text-sm">الرجوع إلى تسجيل الدخول</a>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;