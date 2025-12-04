// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Gunakan config punyamu sendiri
const firebaseConfig = {
  apiKey: "AIzaSyCTdbNRf0Tm7pS1hCFCQdCxhEbgkhlfv1Y",
  authDomain: "pbpfirebase.firebaseapp.com",
  projectId: "pbpfirebase",
  storageBucket: "pbpfirebase.firebasestorage.app",
  messagingSenderId: "673325960136",
  appId: "1:673325960136:web:6429d70e78b55072064efd",
  measurementId: "G-CV8YGKCLDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export modules yang dipakai di React Native
export const auth = getAuth(app);
export const db = getFirestore(app);
