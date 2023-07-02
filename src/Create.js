import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Stack, Button } from "react-bootstrap";
import { convertDateToTimestamp, generateUUID } from "./util";
import { useNavigate } from "react-router";
import { submitNewEvent } from "./firebase";

export const Create = ({ setErrorMessage }) => {
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [eventDates, setEventDates] = useState([]);
  const navigate = useNavigate();

  const resetForm = () => {
    setEventName("");
    setEventLocation("");
    setHostName("");
    setHostEmail("");
    setEventDates([]);
    //refresh the page
    navigate(0);
  };

  const handleSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();
    if (!eventDates.length >= 1) {
      setErrorMessage("You must select at least one date!");
    } else {
      const convertedEventDates = eventDates.map((date) =>
        convertDateToTimestamp(date)
      );
      const uuid = generateUUID();
      const secretUuid = generateUUID();
      const payload = {
        uuid,
        secretUuid,
        eventName,
        eventLocation,
        hostName,
        hostEmail,
        eventDates: convertedEventDates,
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
