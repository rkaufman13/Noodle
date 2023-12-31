import { v4 as uuidv4 } from "uuid";
import tabFocus from "ally.js/maintain/tab-focus";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const convertTimeStampToDate = (timestamp) => {
  const newDate = new Date(parseInt(timestamp * 1000));
  return (
    newDate.getMonth() +
    1 +
    "/" +
    newDate.getDate() +
    "/" +
    newDate.getFullYear()
  );
};

export const convertTimeStampToDateString = (timestamp) => {
  const newDate = new Date(parseInt(timestamp * 1000));
  return (
    weekdays[newDate.getDay()] +
    ", " +
    months[newDate.getMonth()] +
    " " +
    newDate.getDate()
  );
};

export const convertTimeStampToFormattedDate = (timestamp) => {
  const newDate = new Date(parseInt(timestamp * 1000));
  return (
    <>
      <div className="weekday text-center text-uppercase">
        {weekdays[newDate.getDay()]}
      </div>
      <div className="month text-center text-uppercase text-lg fs-5">
        {months[newDate.getMonth()]}
      </div>
      <div className="date text-center text-uppercase text-lg fs-3">
        {newDate.getDate()}
      </div>
    </>
  );
};

export const convertDateToTimestamp = (date) => {
  return Math.floor(new Date(date).getTime() / 1000);
};

export const generateUUID = () => {
  return uuidv4();
};

export const reverseObject = (event) => {
  const participantsObj = {};
  const datesArray = Object.keys(event.dates);
  datesArray.forEach((date) => {
    event.dates[date].participants?.forEach((participant) => {
      if (participant === 0) {
        //do nothing
      } else {
        if (participantsObj[participant]?.dates) {
          participantsObj[participant].dates[date] = "yes";
        } else {
          participantsObj[participant] = {};
          participantsObj[participant]["dates"] = {};
          participantsObj[participant]["dates"][date] = "yes";
        }
      }
    });
  });
  return participantsObj;
};

export const generateExpirationDate = (timestampArray) => {
  const thirtyDaysFromLastDate =
    timestampArray.sort()[timestampArray.length - 1] + 60 * 60 * 24 * 30; //30 days;
  const sixtyDaysFromNow = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60; //60 days; we divide by 1000 so this timestamp conforms with the others that we've already converted to "JS time"
  return Math.min(thirtyDaysFromLastDate, sixtyDaysFromNow);
};

// Ally Tab Trapping
let tabTrap;

export const setTabFocus = (element) => {
  tabTrap = tabFocus({
    context: element,
  });
};

export const clearTabFocus = () => {
  tabTrap.disengage();
};
