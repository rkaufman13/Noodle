// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3zGmpfw0x2tn6VR0JN1okdw4j05rMq3w",
  authDomain: "noodle-1556a.firebaseapp.com",
  projectId: "noodle-1556a",
  storageBucket: "noodle-1556a.appspot.com",
  messagingSenderId: "807317013842",
  appId: "1:807317013842:web:8c3d718910263c09dc668b",
  databaseURL: "https://noodle-1556a-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get an event
export const getSingleEvent = (eventID) => {
  const database = getDatabase();
  const singleEventRef = ref(database, "event/" + eventID);
  return get(singleEventRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
};
