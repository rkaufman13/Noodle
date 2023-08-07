export const sendConfirmationEmail = (vars) => {
  //todo DRY out the param builder
  const fullURL = `${process.env.REACT_APP_BASE_URL}/admin/${vars.secretUuid}`;
  var params = {
    from: {
      email: "noodle@noodleapp.cool",
    },
    personalizations: [
      {
        to: [{ email: vars.hostEmail }],
        dynamic_template_data: {
          name: vars.hostName,
          eventName: vars.eventName,
          eventAdminUrl: fullURL,
          respondee: vars.respondee,
        },
      },
    ],
    template_id: "d-6e89baf471ab478682b2757a40fbe4fe",
  };

  const result = fetch(process.env.REACT_APP_BASE_BACKEND_URL + "/send/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((response) => {
    return response;
  });
  return result;
};

export const sendResponseEmail = async (vars) => {
  const fullURL = `${process.env.REACT_APP_BASE_URL}/admin/${vars.secretUuid}`;
  var params = {
    from: {
      email: "noodle@noodleapp.cool",
    },
    personalizations: [
      {
        to: [{ email: vars.hostEmail }],
        dynamic_template_data: {
          name: vars.hostName,
          eventName: vars.eventName,
          eventAdminUrl: fullURL,
        },
      },
    ],
    template_id: "d-1c0fd3f9eb674287b5eb839deb958cf0",
  };

  const response = await fetch(
    process.env.REACT_APP_BASE_BACKEND_URL + "send",
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
  return response;
};
