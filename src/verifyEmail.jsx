import { dosendEmailVerification } from "./Firebase/auth";
import { useState, useEffect } from "react";
import { useAuth } from "./contexts/authContext";
import { Navigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  
  const { userLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  } else if (currentUser.emailVerified) {
    return <Navigate to="/profile" />;
  }

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        return "البريد الإلكتروني غير صحيح.";
      case "auth/too-many-requests":
        return "تم حظر الحساب مؤقتاً بسبب محاولات فاشلة متكررة.";
      case "auth/network-request-failed":
        return "فشل الاتصال بالشبكة. تحقق من الإنترنت.";

      default:
        console.log(error);
        return "حدث خطأ غير متوقع. حاول مرة أخرى.";
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending || cooldown > 0) return;
    setIsSending(true);
    setErrorMessage("");

    try {
      await dosendEmailVerification();
      alert("تم إرسال رابط التحقق إلى بريدك الإلكتروني.");
      setCooldown(30);
    } catch (error) {
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setIsSending(false);
    }

  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 text-black dark:text-white p-10 rounded-2xl shadow-lg max-w-md w-full border border-gray-300 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-center">تحقق من البريد الإلكتروني</h1>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="my-4 text-right">
          <label htmlFor="email" className="block mb-2 font-semibold">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            dir="ltr"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
          />
        </div>

        <button
          type="submit"
          disabled={isSending || cooldown > 0}
          className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer ${
            isSending || cooldown > 0
              ? "bg-gray-400 text-white"
              : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white"
          }`}
        >
          {isSending
            ? "جاري إرسال رابط التحقق..."
            : cooldown > 0
            ? `انتظر ${cooldown} ثانية لإعادة الإرسال`
            : "إرسال رابط التحقق"}
        </button>
      </form>

      <div className="text-center mt-4">
        <a href="/login" className="text-blue-500 hover:underline text-sm">الرجوع إلى تسجيل الدخول</a>
      </div>

    </div>
  );
};

export default VerifyEmail;