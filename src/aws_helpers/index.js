import AWS from "aws-sdk";

const SESConfig = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
  apiVersion: "latest",
};

AWS.config.update(SESConfig);
const ses = new AWS.SES();

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
    Source: "rkaufman13@gmail.com",
    Template: "EventCreatedTemplate",
    TemplateData: templateData,
    ReplyToAddresses: ["rkaufman13@gmail.com"],
  };

  var sendPromise = ses.sendTemplatedEmail(params).promise();
  sendPromise
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
};

export const sendResponseEmail = (vars) => {
  const templateData =
    '{"name":"' +
    vars.hostName +
    '","eventName":"' +
    vars.eventname +
    '","eventAdminUrl":"' +
    process.env.REACT_APP_BASE_URL +
    "/admin/" +
    vars.admin +
    '","respondee":"' +
    vars.respondee +
    '"}';

  var params = {
    Destination: {
      ToAddresses: [vars.hostEmail],
    },
    Source: "rkaufman13@gmail.com",
    Template: "RsvpTemplate",
    TemplateData: templateData,
    ReplyToAddresses: ["rkaufman13@gmail.com"],
  };

  var sendPromise = ses.sendTemplatedEmail(params).promise();
  sendPromise
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
};
