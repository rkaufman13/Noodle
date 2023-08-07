import React, { useState } from "react";
import { Calendar } from "./calendar";
import DatePanel from "./calendar/plugins/date_panel/date_panel";
import { Button, Form } from "react-bootstrap";
import {
  convertDateToTimestamp,
  generateUUID,
  generateExpirationDate,
} from "./util";
import { useNavigate, useOutletContext } from "react-router";
import { submitNewEvent } from "./firebase";
import { sendConfirmationEmail } from "./sg_helpers";

export const Create = () => {
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [eventDates, setEventDates] = useState([]);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage, successMessage, setSuccessMessage] =
    useOutletContext();
  const handleSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();
    if (!eventDates.length >= 2) {
      setErrorMessage("You must select at least two dates!");
    } else {
      const convertedEventDates = eventDates.map((date) =>
        convertDateToTimestamp(date)
      );
      if (
        !convertedEventDates.every(
          (date) => date > Math.floor(new Date() / 1000)
        )
      ) {
        setErrorMessage("Dates must be in the future!");
      } else {
        const dateEntries = convertedEventDates.map((date) => {
          const participantObj = { participants: [0] }; //we have to add a truthy-but-falsy value here or firebase loses its mind
          return [date, participantObj];
        });
        const finalDates = Object.fromEntries(dateEntries);
        const secretUuid = generateUUID();

        const payload = {
          uuid: generateUUID(),
          secretUuid,
          eventName,
          eventDesc,
          eventLocation,
          hostName,
          hostEmail,
          eventDates: finalDates,
          deleteAt: generateExpirationDate(convertedEventDates),
        };
        submitNewEvent(payload).then(
          () => {
            if (!!payload.hostEmail) {
              sendConfirmationEmail(payload);
            }

            navigate("admin/" + secretUuid);
          },
          (error) => {
            console.log(error);
            setErrorMessage(
              "An unknown error occurred; please wait a few minutes and try again!"
            );
          }
        );
      }
    }
  };

  const formIsInvalid = () => {
    return !eventDates.length > 0 || !eventName || !hostName;
  };

  return (
    <div className="create">
      <p>Create a Nood. It's free, and we respect your privacy.</p>
      <Form className="vstack gap-3" onSubmit={handleSubmit}>
        <Form.Group controlId="eventName">
          <Form.Label>What's your event called? *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name your Nood"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="eventDesc">
          <Form.Label>Describe your Nood</Form.Label>
          <Form.Control
            type="text"
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="eventLocation">
          <Form.Label>Event address?</Form.Label>
          <Form.Control
            type="text"
            value={eventLocation}
            placeholder="Where's your Nood"
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="hostName">
          <Form.Label>What's your name? *</Form.Label>
          <Form.Control
            type="text"
            value={hostName}
            placeholder="Your name; no impastas, please"
            onChange={(e) => setHostName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="hostContact">
          <Form.Label className="w-75">
            What's your email? This is optional, but if you provide it, we'll
            email you a link to manage your Nood, as well as notify you whenever
            anyone fills it out. We won't email you for any other purpose.
          </Form.Label>
          <Form.Control
            type="email"
            value={hostEmail}
            placeholder="you@mail.com"
            onChange={(e) => setHostEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="dates">
          <Form.Label>
            What dates would you like to offer as options? *
          </Form.Label>
          <Calendar
            value={eventDates}
            onChange={setEventDates}
            plugins={[<DatePanel />]}
            multiple
            highlightToday={false}
          />
        </Form.Group>
        <Button type="submit" disabled={formIsInvalid()} variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};
