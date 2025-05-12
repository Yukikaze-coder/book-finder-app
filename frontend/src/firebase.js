import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDshWiSCGPAGUAdJ9A3jS-mlhEoP1p3-94",
  authDomain: "book-finder-107ec.firebaseapp.com",
  projectId: "book-finder-107ec",
  storageBucket: "book-finder-107ec.firebasestorage.app",
  messagingSenderId: "408943937258",
  appId: "1:408943937258:web:4a3951cde5a610745c7993",
  measurementId: "G-4DZGSHXPSW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
//export const facebookProvider = new FacebookAuthProvider();
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
export default app;