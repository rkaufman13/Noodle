// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set,
  query,
  orderByChild,
  endAt,
  limitToLast,
  update,
  remove,
} from "firebase/database";
import { sendResponseEmail } from "../aws_helpers";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: "noodle-390216",
  storageBucket: "noodle-390216.appspot.com",
  messagingSenderId: "293031501671",
  appId: process.env.REACT_APP_FIREBASE_APPID,
  databaseURL: process.env.REACT_APP_DATABASEURL,
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

//submit a response to an existing event
export const submitPayload = (payload) => {
  //todo only update the dates that have had updates
  const db = getDatabase();
  update(ref(db, "event/" + payload.eventUUID), {
    dates: payload.dates,
  });
  //retrieve email address of event host
  const singleEvent = ref(db, "event/" + payload.eventUUID);

  get(singleEvent).then((snapshot) => {
    if (snapshot.exists() && snapshot.val().hostEmail !== "") {
      const RsvpPayload = { respondee: payload.name, ...snapshot.val() };
      sendResponseEmail(RsvpPayload);
    }
  });
};

//create a new event
export const submitNewEvent = (payload) => {
  const db = getDatabase();
  const createdEvent = set(ref(db, "event/" + payload.uuid), {
    eventname: payload.eventName,
    eventLocation: payload.eventLocation,
    hostName: payload.hostName,
    hostEmail: payload.hostEmail,
    dates: payload.eventDates,
    admin: payload.secretUuid,
    active: true,
    created: Math.floor(Date.now() / 1000),
    deleteAt: payload.deleteAt,
  });
  //perform housekeeping on db
  const dbRef = ref(db, "event");
  const queryRef = query(
    dbRef,
    orderByChild("deleteAt"),
    endAt(Math.floor(Date.now() / 1000))
  );
  get(queryRef).then((snapshot) => {
    if (snapshot.exists()) {
      const keysToDelete = Object.keys(snapshot.val());
      for (let key of keysToDelete) {
        const singleEventRef = ref(db, "event/" + key);
        remove(singleEventRef);
      }
    }
  });
  return createdEvent;
};

//retrieve the event via secret ID
export const getSingleAdminEvent = (eventID) => {
  const database = getDatabase();
  const dbRef = ref(database, "event");
  const queryRef = query(
    dbRef,
    orderByChild("admin"),
    endAt(eventID),
    limitToLast(1)
  );

  return get(queryRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  });
};

//close an event
export const closeEvent = (eventId) => {
  const database = getDatabase();
  const singleEventRef = ref(database, "event/" + eventId);
  const updates = {};
  updates["/active/"] = false;
  return update(singleEventRef, updates);
};

//immediately delete an event
export const deleteEvent = (eventId) => {
  const database = getDatabase();
  const singleEventRef = ref(database, "event/" + eventId);
  return remove(singleEventRef);
};
