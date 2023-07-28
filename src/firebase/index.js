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
} from "firebase/database";

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
    if (
      snapshot.exists() &&
      snapshot.val().deleteAt >= Math.floor(Date.now() / 1000)
    ) {
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
  const singleEventHostEmail = ref(
    db,
    "event/" + payload.eventUUID + "/hostEmail"
  );
  get(singleEventHostEmail).then((snapshot) => {
    if (snapshot.exists() && snapshot.val() !== "") {
      console.log("the host's email is " + snapshot.val());
    }
  });
};

//create a new event
export const submitNewEvent = (payload) => {
  const db = getDatabase();
  const createdEvent = set(ref(db, "event/" + payload.uuid), {
    eventname: payload.eventName,
    eventLocation: payload.eventLocation,
    eventDesc: payload.eventDesc,
    hostName: payload.hostName,
    hostEmail: payload.hostEmail,
    dates: payload.eventDates,
    admin: payload.secretUuid,
    active: true,
    created: Math.floor(Date.now() / 1000),
    deleteAt: payload.deleteAt,
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
      const eventKey = Object.keys(snapshot.val());
      const eventWeWant = snapshot.val()[eventKey];
      if (eventWeWant.deleteAt >= Math.floor(Date.now() / 1000)) {
        console.log(snapshot.val()[eventKey]);
        return [snapshot.val()[eventKey], eventKey];
      }
      console.log(eventWeWant.deleteAt, Math.floor(Date.now() / 1000));
      return [null, null];
    }
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

//soft-delete an event
export const deleteEvent = (eventId) => {
  const database = getDatabase();
  const singleEventRef = ref(database, "event/" + eventId);
  const updates = {};
  updates["/deleteAt"] = Math.floor(new Date() / 1000) - 10;

  return update(singleEventRef, updates);
};
