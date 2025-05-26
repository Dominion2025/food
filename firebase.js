// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { db } from "./firebase.js";
import { ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYHWAyXT8S5c0z2taUTT2m0rd4TFS4hQE",
  authDomain: "food-e9814.firebaseapp.com",
  projectId: "food-e9814",
  storageBucket: "food-e9814.firebasestorage.app",
  messagingSenderId: "401698952228",
  appId: "1:401698952228:web:899327e7f887cacc8b74b1",
  measurementId: "G-0WF2QWFNMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function saveUserChoice(id, thursdayDinner, fridayLunch, fridayDinner, saturdayLunch, saturdayDinner) {
  const userRef = ref(db, `users/${id}`);
  set(userRef, {
    thursdayDinner: thursdayDinner,
    fridayLunch: fridayLunch,
    fridayDinner: fridayDinner,
    saturdayLunch: saturdayLunch,
    saturdayDinner: saturdayDinner
  });
}