// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fnshope-4a954.firebaseapp.com",
  projectId: "fnshope-4a954",
  storageBucket: "fnshope-4a954.appspot.com",
  messagingSenderId: "149365153631",
  appId: "1:149365153631:web:99645046f4cbf1a6a160ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);