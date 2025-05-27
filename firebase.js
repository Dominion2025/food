// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
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
  measurementId: "G-0WF2QWFNMX",
  databaseURL: "https://food-e9814-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export function saveUserChoice(id, thursdayDinner, fridayLunch, fridayDinner, saturdayLunch, saturdayDinner) {
  const userRef = ref(db, `users/${id}`);
  set(userRef, {
    thursdayDinner: thursdayDinner,
    fridayLunch: fridayLunch,
    fridayDinner: fridayDinner,
    saturdayLunch: saturdayLunch,
    saturdayDinner: saturdayDinner
  });
}

export async function getUserData(userId) {
  // Create a reference to the specific user in the database
  const userRef = ref(db, 'users/' + userId);

  try {
    // Fetch the data from the database
    const snapshot = await get(userRef);

    // Check if the snapshot exists and return true if the user data is found
    if (snapshot.exists()) {
      return true;
    } else {
      return false;  // Return false if no data exists for that user
    }
  } catch (error) {
    // Handle any errors
    console.error("Error getting user data: ", error);
    return false;  // Return false if there was an error
  }
}
