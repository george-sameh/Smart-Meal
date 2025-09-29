import { dosendEmailVerification } from "./Firebase/auth";
import { useState, useEffect } from "react";
import { useAuth } from "./contexts/authContext";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  
  const { userLoggedIn, currentUser } = useAuth();
  const { t, i18n } = useTranslation();

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
        return t("errors.invalidEmail");
      case "auth/too-many-requests":
        return t("errors.tooManyRequests");
      case "auth/network-request-failed":
        return t("errors.networkRequestFailed");

      default:
        console.log(error);
        return t("errors.defaultError");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending || cooldown > 0) return;
    setIsSending(true);
    setErrorMessage("");

    try {
      await dosendEmailVerification();
      alert (t("verificationIsSent"));
      setCooldown(30);
    } catch (error) {
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setIsSending(false);
    }

  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 text-black dark:text-white p-10 rounded-2xl shadow-lg max-w-md w-full border border-gray-300 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-center">{t("verifyEmail")}</h1>

      {errorMessage && (
        <p className="text-red-500 dark:text-red-400 text-sm text-center mt-2">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className={`my-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
          <label htmlFor="email" className="block mb-2 font-semibold">
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            value={currentUser?.email || ""}
            readOnly
            dir="ltr"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
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
            ? t("sendingVerification")
            : cooldown > 0
            ? `${t("wait")} ${cooldown} ${t("secondsToResend")}`
            : t("sendVerificationLink")}
        </button>
      </form>

      <div className="text-center mt-4">
        <a href="/login" className="text-blue-500 hover:underline text-sm">{t("backToLogin")}</a>
      </div>

    </div>
  );
};

export default VerifyEmail;