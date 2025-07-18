type SendResponseEmailVars = {
  admin: string;
  hostEmail: string;
  hostName: string;
  respondee: string;
};

type SendConfirmationEmailVars = {
  secretUuid: string;
  hostEmail: string;
  eventName: string;
  hostName: string;
};

export const sendResponseEmail = (vars: SendResponseEmailVars) => {
  //todo DRY out the param builder
  const fullURL = `${process.env.REACT_APP_BASE_URL}/admin/${vars.admin}`;
  var params = {
    ...vars,
    fullURL,
  };
  try {
    const result = fetch(
      process.env.REACT_APP_BASE_BACKEND_URL + "/send/rsvp",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    ).then((response) => {
      return response;
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const sendConfirmationEmail = async (
  vars: SendConfirmationEmailVars
) => {
  const fullURL = `${process.env.REACT_APP_BASE_URL}/admin/${vars.secretUuid}`;
  var params = {
    ...vars,
    fullURL,
  };

  const sendConfirmationEmailEndpoint =
    process.env.REACT_APP_BASE_BACKEND_URL + "/send";
  console.log(sendConfirmationEmailEndpoint);
  try {
    const response = await fetch(sendConfirmationEmailEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((response) => {
      return response;
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
