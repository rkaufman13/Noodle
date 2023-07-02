import { v4 as uuidv4 } from "uuid";

export const convertTimeStampToDate = (timestamp) => {
  const date = new Date(parseInt(timestamp * 1000));

  return date.getMonth() + 1 + "/" + date.getDay() + "/" + date.getFullYear();
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
      if (participantsObj[participant]?.dates) {
        participantsObj[participant].dates[date] = "yes";
      } else {
        participantsObj[participant] = {};
        participantsObj[participant]["dates"] = {};
        participantsObj[participant]["dates"][date] = "yes";
      }
    });
  });
  return participantsObj;
};
