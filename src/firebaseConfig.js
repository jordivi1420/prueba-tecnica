// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA7n-z4zh3eVm9S7t4m45ovfYMaysaKsb0",
  authDomain: "hotel-1c36f.firebaseapp.com",
  projectId: "hotel-1c36f",
  storageBucket: "hotel-1c36f.firebasestorage.app",
  messagingSenderId: "270061181076",
  appId: "1:270061181076:web:f588afa17cd0a1f52dfc81",
  measurementId: "G-5EW0G4ZC5V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
