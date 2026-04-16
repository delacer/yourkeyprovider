// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_jcEfkltX2fBT3JKwwCf91-Bjb8tG-e8",
  authDomain: "yourkeyprovider-4c13e.firebaseapp.com",
  projectId: "yourkeyprovider-4c13e",
  storageBucket: "yourkeyprovider-4c13e.firebasestorage.app",
  messagingSenderId: "434589234059",
  appId: "1:434589234059:web:6f2d027090907a5ef6358e",
  measurementId: "G-ZLLD92STMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Storage and Firestore
export const storage = getStorage(app);
export const db = getFirestore(app);
