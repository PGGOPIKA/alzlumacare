// public/firebase-messaging-sw.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging';

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

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: "/firebase-logo.png" // option
  });
});
