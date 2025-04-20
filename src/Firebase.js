// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK_-Cw97Bp1-aZzYF9J4gG-rn48T9QuGM",
  authDomain: "alzlumacare.firebaseapp.com",
  projectId: "alzlumacare",
  storageBucket: "alzlumacare.firebasestorage.app",
  messagingSenderId: "399720317886",
  appId: "1:399720317886:web:4c139ca5f30556206cafef",
  measurementId: "G-0HGDP9NWRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);