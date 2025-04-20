// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK_-Cw97Bp1-aZzYF9J4gG-rn48T9QuGM",
  authDomain: "alzlumacare.firebaseapp.com",
  projectId: "alzlumacare",
  storageBucket: "alzlumacare.firebasestorage.app",
  messagingSenderId: "399720317886",
  appId: "1:399720317886:web:34d6e37505ff5bf36cafef",
  measurementId: "G-EXL0ECXYBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
