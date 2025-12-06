import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVki_3W39erilBzcKuyhr9tICD9j-f5lE",
  authDomain: "rooted-in-water.firebaseapp.com",
  projectId: "rooted-in-water",
  storageBucket: "rooted-in-water.firebasestorage.app",
  messagingSenderId: "443781126876",
  appId: "1:443781126876:web:32c4da8c6b842c57f73219",
  measurementId: "G-M4G8T2F8X4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider()