import { useState } from "react";
import { dosigninwithemailandpassword, dosigninwithgoogle } from "./Firebase/auth";
import { db } from "./Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/invalid-credential":
        return t("errors.invalidCredential");
      case "auth/user-not-found":
        return t("errors.userNotFound");
      case "auth/email-not-verified":
        return t("errors.emailNotVerified");
      case "auth/too-many-requests":
        return t("errors.tooManyRequests");
      case "auth/network-request-failed":
        return t("errors.networkRequestFailed");

      case "auth/popup-closed-by-user":
        return t("errors.popupClosedByUser");
      case "auth/google-user-not-found":
        return t("errors.googleUserNotFound");

      default:
        console.log(error);
        return t("errors.defaultError");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSigningIn) return;

    setIsSigningIn(true);
    setErrorMessage("");

    try {
      const { user } = await dosigninwithemailandpassword(email, password);

      if (!user.emailVerified) {
        navigate("/verifyEmail");
        alert(t("emailNotVerifiedRedirect"));
        throw { code: "auth/email-not-verified" };
      }

      await dosigninwithemailandpassword(email, password);
      alert(t("signedInSuccessfully"));
      navigate("/profile");
      
    } catch (error) {
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (isSigningIn) return;

    setIsSigningIn(true);
    setErrorMessage("");

    try {
      const userCredential = await dosigninwithgoogle();
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) { 
        throw { code: "auth/google-user-not-found" }; 
      }

      alert(t("signedInSuccessfully"));

    } catch (error) {
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setIsSigningIn(false);
    }

  };
  
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 text-black dark:text-white p-10 rounded-2xl shadow-lg max-w-md w-full border border-gray-300 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-center">{t("login")}</h1>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            dir="ltr"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
          />
        </div>

        <div className="my-4 text-right">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="font-semibold">
              {t("password")}
            </label>
            <a href="/resetPassword" className="text-sm text-blue-500 hover:underline">
              {t("forgetPassword")}
            </a>
          </div>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            dir="ltr"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
          />
        </div>

        <button
          type="submit"
          disabled={isSigningIn}
          className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer ${
            isSigningIn
              ? "bg-gray-400 text-white"
              : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white"
          }`}
        >
          {isSigningIn ? t("loggingIn") : t("login")}
        </button>
      </form>
        
      <div className="text-center mt-4">
        <a href="/register" className="text-blue-500 hover:underline text-sm">{t("dontHaveAccount")}</a>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-400">{t("or")}</span>
        </div>
      </div>

      <button
        onClick={onGoogleSignIn}
        disabled={isSigningIn}
        className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
      >
        {isSigningIn ? t("loggingIn") : t("signInWithGoogle")}
      </button>
    </div>
  );
};

export default Login;