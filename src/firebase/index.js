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
  connectDatabaseEmulator,
} from "firebase/database";
import { sendResponseEmail } from "../ms_helpers";

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
const db = getDatabase();
if (process.env.NODE_ENV === "development") {
  connectDatabaseEmulator(db, "localhost", 9000);
}

//get an event
export const getSingleEvent = (eventID) => {
  const singleEventRef = ref(db, "event/" + eventID);
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

  update(ref(db, "event/" + payload.eventUUID), {
    dates: payload.dates,
  });
  //retrieve email address of event host
  const singleEvent = ref(db, "event/" + payload.eventUUID);

  get(singleEvent).then((snapshot) => {
    if (snapshot.exists() && snapshot.val().hostEmail !== "") {
      const RsvpPayload = { respondee: payload.name, ...snapshot.val() };
      try {
        sendResponseEmail(RsvpPayload);
      } catch (e) {
        //do nothing for now; the most likely reason this has failed is because we are testing locally and the backend isn't running
      }
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
  const dbRef = ref(db, "event");
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
      if (
        eventWeWant.deleteAt >= Math.floor(Date.now() / 1000) &&
        eventWeWant.admin === eventID
      ) {
        return { event: snapshot.val()[eventKey], key: eventKey[0] };
      }
      return null;
    }
    return null;
  });
};

//close an event
export const closeEvent = (eventId) => {
  const singleEventRef = ref(db, "event/" + eventId);
  const updates = {};
  updates["/active/"] = false;
  return update(singleEventRef, updates);
};

//soft-delete an event
export const deleteEvent = (eventId) => {
  const singleEventRef = ref(db, "event/" + eventId);
  const updates = {};
  updates["/deleteAt"] = Math.floor(new Date() / 1000) - 10;
  updates["/active/"] = false;

  return update(singleEventRef, updates);
};

//delete an admin email from an event
export const deleteEmail = (eventId) => {
  const singleEventRef = ref(db, "event/" + eventId);
  const updates = {};
  updates["/hostEmail"] = null;

  return update(singleEventRef, updates);
};
