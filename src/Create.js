import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Stack, Button } from "react-bootstrap";
import {
  convertDateToTimestamp,
  generateUUID,
  generateExpirationDate,
} from "./util";
import { useNavigate } from "react-router";
import { submitNewEvent } from "./firebase";

export const Create = ({ setErrorMessage, setSuccessMessage }) => {
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [eventDates, setEventDates] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();
    if (!eventDates.length >= 1) {
      setErrorMessage("You must select at least one date!");
    } else {
      const convertedEventDates = eventDates.map((date) =>
        convertDateToTimestamp(date)
      );
      const secretUuid = generateUUID();
      const payload = {
        uuid: generateUUID(),
        secretUuid,
        eventName,
        eventDesc,
        eventLocation,
        hostName,
        hostEmail,
        eventDates: convertedEventDates,
        deleteAt: generateExpirationDate(convertedEventDates),
      };
      submitNewEvent(payload);
      navigate("admin/" + secretUuid);
    }
  };

  return (
    <div className="create">
      <Stack gap={3} className="col-md-5 mx-auto">
        Create a Nood. It's free, and we respect your privacy.
        <form onSubmit={handleSubmit}>
          <div className="p-2">
            <label htmlFor="eventName">What's your event called?</label>
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Name your Nood"
              required
            ></input>
          </div>
          <div className="p-2">
            <label htmlFor="eventDesc">Optional: Describe your Nood</label>
            <input
              type="text"
              name="eventDesc"
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
            ></input>
          </div>
          <div className="p-2">
            <label htmlFor="eventLocation">Event address?</label>
            <input
              type="text"
              name="eventLocation"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder="Where's your Nood"
            ></input>
          </div>
          <div className="p-2">
            <label htmlFor="hostName">What's your name?</label>
            <input
              type="text"
              name="hostName"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Your name; no impastas, please"
              required
            ></input>
          </div>{" "}
          <div className="p-2">
            <label htmlFor="hostContact">
              What's your email? This is optional, but if you provide it, we'll
              email you a link to manage your Nood, as well as notify you
              whenever anyone fills it out. We won't email you for any other
              purpose.
            </label>
            <input
              type="email"
              name="hostEmail"
              value={hostEmail}
              onChange={(e) => setHostEmail(e.target.value)}
              placeholder="you@mail.com"
            ></input>
          </div>
          <div className="p-2">
            <label htmlFor="dates">
              What dates would you like to offer as options?
            </label>
            <Calendar
              value={eventDates}
              onChange={setEventDates}
              plugins={[<DatePanel />]}
              multiple
              highlightToday={false}
            />
          </div>
          <div id="submitButtonContainer">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Stack>
    </div>
  );
};
