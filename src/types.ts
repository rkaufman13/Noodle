import React, { SetStateAction } from "react";

export type NoodleContext = {
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<SetStateAction<string>>;
  successMessage?: string;
  setSuccessMessage?: React.Dispatch<SetStateAction<string>>;
  alertRef?: any;
};
