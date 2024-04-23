import { v4 as uuidv4 } from "uuid";
import tabFocus from "ally.js/maintain/tab-focus";
import { RefObject } from "react";
import { ParticipantsObjType } from "./types";

export const months = [
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

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const convertTimeStampToDate = (timestamp: string) => {
  const newDate = new Date(parseInt(timestamp) * 1000);
  return (
    newDate.getMonth() +
    1 +
    "/" +
    newDate.getDate() +
    "/" +
    newDate.getFullYear()
  );
};

export const convertTimeStampToDateString = (timestamp: string) => {
  const newDate = new Date(parseInt(timestamp) * 1000);
  return (
    weekdays[newDate.getDay()] +
    ", " +
    months[newDate.getMonth()] +
    " " +
    newDate.getDate()
  );
};

export const convertDateToTimestamp = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
};

export const generateUUID = () => {
  return uuidv4();
};

export const reverseObject = (event: any) => {
  const participantsObj: ParticipantsObjType = {};
  const datesArray = Object.keys(event.dates);
  datesArray.forEach((date) => {
    event.dates[date].participants?.forEach((participant: string | number) => {
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

export const generateExpirationDate = (timestampArray: number[]) => {
  const thirtyDaysFromLastDate =
    timestampArray.sort()[timestampArray.length - 1] + 60 * 60 * 24 * 30; //30 days;
  const sixtyDaysFromNow = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60; //60 days; we divide by 1000 so this timestamp conforms with the others that we've already converted to "JS time"
  return Math.min(thirtyDaysFromLastDate, sixtyDaysFromNow);
};

// Ally Tab Trapping
let tabTrap: any;

export const setTabFocus = (element: Element) => {
  tabTrap = tabFocus({
    context: element,
  });
};

export const clearTabFocus = () => {
  tabTrap.disengage();
};

export const handleAlert = (alertRef: RefObject<HTMLElement>) => {
  if (alertRef.current !== undefined) {
    alertRef.current.focus();
  }
};
