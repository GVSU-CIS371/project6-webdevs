// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOeY0cBa2BKrpfNONCeM6OKTGUisvSc88",
  authDomain: "web-dev-project6.firebaseapp.com",
  projectId: "web-dev-project6",
  storageBucket: "web-dev-project6.appspot.com",
  messagingSenderId: "282545382371",
  appId: "1:282545382371:web:1cb2b0809eafae13d6f6d6",
  measurementId: "G-1KEZYNPM9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
