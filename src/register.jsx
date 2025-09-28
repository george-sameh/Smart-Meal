import { useState } from "react";
import { docreateUserWithEmailAndPassword, dosendEmailVerification, dosigninwithgoogle } from "./Firebase/auth";
import { db } from "./Firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        return t("errors.invalidEmail");
      case "auth/email-already-in-use":
        return t("errors.emailAlreadyInUse");
      case "auth/password-does-not-meet-requirements":
        return t("errors.passwordDoesNotMeetRequirements");
      case "auth/network-request-failed":
        return t("errors.networkRequestFailed");

      default:
        console.log(error);
        return t("errors.defaultError");
    }
  };
  
 const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (isRegistering) return;

    setIsRegistering(true); 
    setErrorMessage(""); 

    try {
      const userCredential = await docreateUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: user.email,
        createdAt: serverTimestamp(), 
      });

      await dosendEmailVerification();
      alert(t("verificationIsSent"));

      } catch (error) {
        setErrorMessage(handleFirebaseError(error));
      } finally {
        setIsRegistering(false); 
      }
  };

  const onGoogleSignIn = async (e) => {
   e.preventDefault();
    if (isRegistering) return;
    setIsRegistering(true);
    setErrorMessage("");

    try {
      const result = await dosigninwithgoogle();
      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName || "",
          email: user.email,
          createdAt: serverTimestamp(),
        },
        { merge: true } 
      );
      alert(t("accountCreatedSuccessfully"));

      } catch (error) {
        setErrorMessage(handleFirebaseError(error));
      } finally {
        setIsRegistering(false);
      }
    };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 transition-colors duration-300 text-black dark:text-white p-10 rounded-2xl shadow-lg max-w-md w-full border border-gray-300 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-center">{t("createAccount")}</h1>

      {errorMessage && (
        <p className="text-red-500 dark:text-red-400 text-sm text-center mt-2">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className={`my-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
          <label htmlFor="name" className="block mb-2 font-semibold">
            {t("name")}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder={t("namePlaceholder")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all"
          />
        </div>

        <div className={`my-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
          <label htmlFor="email" className="block mb-2 font-semibold">
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@email.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
            dir="ltr"
          />
        </div>

        <div className="my-4 text-right">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="font-semibold">
              {t("password")}
            </label>
          </div>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all text-left"
            dir="ltr"
          />
        </div>

        <button
          type="submit"
          disabled={isRegistering}
          className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer ${
            isRegistering
              ? "bg-gray-400 text-white"
              : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white"
          }`}
        >
          {isRegistering ? t("creatingAccount") : t("createAccount")}
        </button>
      </form>

      <div className="text-center mt-4">
        <a href="/login" className="text-blue-500 hover:underline text-sm">{t("alreadyHaveAccount")}</a>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-400">{t("or")}</span>
        </div>
      </div>

      <button
        onClick={onGoogleSignIn}
        disabled={isRegistering}
        className="w-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
      >
        {isRegistering ? t("creatingAccount") : t("createAccountWithGoogle")}
      </button>
    </div>
  );
};

export default Register;