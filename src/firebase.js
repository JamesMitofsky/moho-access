import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyCMXlK1ETvFsc_jggy9mKhe_rcwqd-4yPM",
  // authDomain: "moho-auth.firebaseapp.com",
  // projectId: "moho-auth",
  // storageBucket: "moho-auth.appspot.com",
  // messagingSenderId: "1034566431316",
  // appId: "1:1034566431316:web:168d6186d1596c1073b3c1",
  // measurementId: "G-NWL9M7L43L",
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSENGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
