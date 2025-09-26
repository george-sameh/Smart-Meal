import { 
  auth 
} from "./firebase";

import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification
} from "firebase/auth";

export const docreateUserWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const dosigninwithemailandpassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const dosigninwithgoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export const dosignout = () => {
  return signOut(auth);
}

export const dopasswordreset = (email) => {
  return sendPasswordResetEmail(auth, email);
}

export const dopasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
}

export const dosendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/profile`
  });
}