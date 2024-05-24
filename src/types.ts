import React, { SetStateAction } from "react";

export type NoodleContext = {
  errorMessage: string;
  setErrorMessage: React.Dispatch<SetStateAction<string>>;
  successMessage: string;
  setSuccessMessage: React.Dispatch<SetStateAction<string>>;
  alertRef: any;
};

export type AdminEvent = {
  eventKey: string;
  active: boolean;
  dates: any; //todo
  eventname: string;
  eventDesc: string;
  admin: string;
  deleteAt: number;
  uuid: string;
  hostEmail: string;
};

export type ParticipantsObjType = {
  [key: string]: any; //todo
};
