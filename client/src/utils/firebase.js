// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "flowfix-d3f16.firebaseapp.com",
  projectId: "flowfix-d3f16",
  storageBucket: "flowfix-d3f16.firebasestorage.app",
  messagingSenderId: "102395733354",
  appId: "1:102395733354:web:5304c0345974cfe471b113",
  measurementId: "G-41NG84PMVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);