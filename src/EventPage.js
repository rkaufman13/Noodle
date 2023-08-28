import React, { useState } from "react";
import { getSingleEvent } from "./firebase";
import { DateTable } from "./DateTable";
import { reverseObject } from "./util";
import { Participants } from "./Participants";
import { AddNewRow } from "./AddNewRow";
import { useOutletContext } from "react-router";
import { submitPayload } from "./firebase/index";
import { Button, Stack, Alert, Spinner, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";

import {
  useLoaderData,
  Await,
  defer,
  useAsyncValue,
  useParams,
} from "react-router-dom";

export const loader = ({ params }) => {
  const singleEventPromise = getSingleEvent(params.eventUUID);
  return defer({ singleEvent: singleEventPromise });
};

const EventChild = () => {
  const [name, setName] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [activePerson, setActivePerson] = useState("");
  const [errorMessage, setErrorMessage, successMessage, setSuccessMessage] =
    useOutletContext();
  const params = useParams();
  const resolvedSingleEvent = useAsyncValue(); //this gives us an object organized by date
  //the below gives us an array of objects organized by participant
  //we're not storing this in a smart, relational database sort of way because we want the participants' names and identities to completely disappear when the event is closed/deleted. #privacy!
  if (!resolvedSingleEvent) {
    return (
      <p>
        There's nothing here! Either you've entered in an incorrect URL, or
        tried to access a Noodle after it was deleted, or something else went
        wrong. If you think there should be something here, get in touch.
      </p>
    );
  }
  let datesArray = resolvedSingleEvent.dates;
  if (!Array.isArray(resolvedSingleEvent.dates)) {
    datesArray = Object.keys(resolvedSingleEvent.dates);
  }
  datesArray = datesArray.map((date) => parseInt(date));
  const participants = reverseObject(resolvedSingleEvent);

  const participantsArray = Object.keys(participants);
  //  because of the above silly way we're storing data, we now have to map over the participants object and insert the dates that the participant *can't* attend, for use later when we build the table

  datesArray.forEach((date) => {
    participantsArray.forEach((participant) => {
      if (participants[participant].dates[date] === "yes") {
        //do nothing
      } else {
        participants[participant].dates[date] = "no";
      }
    });
  });

  const clearForm = () => {
    setActivePerson(name);
    setName("");
    setAvailableDates([]);
    const successMessage =
      "You've successfully RSVPed to " + resolvedSingleEvent.eventname + "!";
    setSuccessMessage(successMessage);
  };

  const handleNameUpdate = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (participantsArray.includes(name)) {
      setErrorMessage("Looks like you already registered for this event!");
    } else if (availableDates.length === 0) {
      setErrorMessage("You must select at least one date.");
    } else if (!name) {
      setErrorMessage("Your name can't be blank.");
    } else {
      for (let selectedDate of availableDates) {
        resolvedSingleEvent.dates[selectedDate].participants.push(name);
      }
      const payload = {
        eventUUID: params.eventUUID,
        dates: resolvedSingleEvent.dates,
        name,
      };
      submitPayload(payload);
      clearForm();
    }
  };

  const formIsInvalid = () => {
    return availableDates.length === 0 || !name;
  };

  return (
    <>
      <Helmet>
        <title>Noodle Scheduling ~ {resolvedSingleEvent.eventname ?? "Untitled Event"}</title>
        <meta name="description" content={resolvedSingleEvent.hostName + " sent you a Nood!" ?? "Someone sent you a Nood!"} />
      </Helmet>
      <h1>{resolvedSingleEvent.eventname ?? "Untitled Event"}</h1>
      {resolvedSingleEvent.eventDesc && (
        <h2>{resolvedSingleEvent.eventDesc}</h2>
      )}
      {resolvedSingleEvent.eventLocation && (
        <>
          <p>
            <span className="h4">Location:</span>{" "}
            {resolvedSingleEvent.eventLocation}
          </p>
        </>
      )}
      {!resolvedSingleEvent.active && (
        <Alert variant="warning">This Noodle is closed.</Alert>
      )}
      <p>
        {resolvedSingleEvent.hostName ?? "Someone"} invited you to respond to
        this Noodle. Add your name and the dates you're available below, and let
        the fun start!
      </p>
      <Stack className="overflow-auto container-lg">
        <Form onSubmit={handleSubmit}>
          <DateTable
            participants={participants}
            dates={datesArray}
            eventUUID={params.eventUUID}
            resolvedSingleEvent={resolvedSingleEvent}
          >
            <Participants
              participants={participants}
              dates={datesArray}
              activePerson={activePerson}
            />
            {resolvedSingleEvent.active && (
              <AddNewRow
                dates={datesArray}
                name={name}
                handleNameUpdate={handleNameUpdate}
                availableDates={availableDates}
                setAvailableDates={setAvailableDates}
              />
            )}
          </DateTable>

          {resolvedSingleEvent.active && (
            <div className="text-center">
              <Button
                type="submit"
                variant="primary"
                disabled={formIsInvalid()}
              >
                Submit
              </Button>
            </div>
          )}
        </Form>
      </Stack>
    </>
  );
};

export const EventPage = () => {
  const data = useLoaderData();

  return (
    <>
      <React.Suspense
        fallback={
          <>
            <Spinner></Spinner>Loading...
          </>
        }
      >
        <Await
          resolve={data.singleEvent}
          errorElement={<p>An error occurred</p>}
        >
          <EventChild />
        </Await>
      </React.Suspense>
    </>
  );
};
