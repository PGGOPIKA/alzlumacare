// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app); // optional, remove if not needed

const messaging = getMessaging(app);

// ✅ Export these functions so they can be imported in App.js
export const requestPermission = async () => {
  console.log("Requesting notification permission...");
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE' // Replace with your actual VAPID key
    });
    console.log("Notification permission granted. Token:", token);
  } else {
    console.log("Notification permission denied.");
  }
};

export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // You can show a custom toast or notification here
  });
};
