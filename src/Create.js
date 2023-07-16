import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Button, Form } from "react-bootstrap";
import {
  convertDateToTimestamp,
  generateUUID,
  generateExpirationDate,
} from "./util";
import { useNavigate, useOutletContext } from "react-router";
import { submitNewEvent } from "./firebase";
import { sendConfirmationEmail } from "./aws_helpers";

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
    if (!eventDates.length >= 1) {
      setErrorMessage("You must select at least one date!");
    } else {
      const convertedEventDates = eventDates.map((date) =>
        convertDateToTimestamp(date)
      );
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
      const result = submitNewEvent(payload);
      if (result) {
        if (!!payload.hostEmail) {
          sendConfirmationEmail(payload);
        }
        navigate("admin/" + secretUuid);
      } else {
        setErrorMessage("An unknown error occurred, please try again");
      }
    }
  };

  return (
    <div className="create">
      <p>Create a Nood. It's free, and we respect your privacy.</p>
      <Form className="vstack gap-3" onSubmit={handleSubmit}>
        <Form.Group controlId="eventName">
          <Form.Label>What's your event called?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name your Nood"
            name="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)} // It might be better to get all of these working with an "onBlur" instead of "onChange"
            required
          />
        </Form.Group>
        <Form.Group controlId="eventDesc">
          <Form.Label>Optional: Describe your Nood</Form.Label>
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
          <Form.Label>What's your name?</Form.Label>
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
            What dates would you like to offer as options?
          </Form.Label>
          <Calendar
            value={eventDates}
            onChange={setEventDates}
            plugins={[<DatePanel />]}
            multiple
            highlightToday={false}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
