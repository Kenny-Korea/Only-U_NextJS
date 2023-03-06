// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_API_KEY,
  authDomain: "only-u-bc791.firebaseapp.com",
  projectId: "only-u-bc791",
  storageBucket: "only-u-bc791.appspot.com",
  messagingSenderId: "823070477060",
  appId: "1:823070477060:web:f864d3643eddf8273e5e51",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
