import { v4 as uuidv4 } from "uuid";

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
