export const sendConfirmationEmail = (vars) => {
  const templateData =
    '{"name":"' +
    vars.hostName +
    '","eventName":"' +
    vars.eventName +
    '","eventAdminUrl":"' +
    process.env.REACT_APP_BASE_URL +
    "/admin/" +
    vars.secretUuid +
    '"}';

  var params = {
    Destination: {
      ToAddresses: [vars.hostEmail],
    },
    Source: "rkaufman13+receive@gmail.com",
    Template: "EventCreatedTemplate",
    TemplateData: templateData,
    ReplyToAddresses: ["rkaufman13+receive@gmail.com"],
  };

  fetch(process.env.REACT_APP_BASE_BACKEND_URL + "/send/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((response) => response.json());
};
