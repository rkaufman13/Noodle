import React, { useState } from "react";
import { getSingleEvent } from "./firebase";
import { DateTable } from "./DateTable";
import { reverseObject } from "./util";
import { Participants } from "./Participants";
import { AddNewRow } from "./AddNewRow";
import { useNavigate } from "react-router";
import { submitPayload } from "./firebase/index";
import { Button, Stack, Alert, Spinner } from "react-bootstrap";

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
  const navigate = useNavigate();

  const resolvedSingleEvent = useAsyncValue(); //this gives us an object organized by date
  //the below gives us an array of objects organized by participant
  //we're not storing this in a smart, relational database sort of way because we want the participants' names and identities to completely disappear when the event is closed/deleted. #privacy!

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

  const params = useParams();

  const clearForm = () => {
    setName("");
    setAvailableDates([]);
    //refresh the page
    navigate(0);
  };

  const handleNameUpdate = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    //todo disallow duplicates
    for (let selectedDate of availableDates) {
      resolvedSingleEvent.dates[selectedDate].participants.push(name);
    }
    const payload = {
      eventUUID: params.eventUUID,
      dates: resolvedSingleEvent.dates,
    };
    submitPayload(payload);
    clearForm();
  };
  return (
    <>
      <h1>{resolvedSingleEvent.eventname ?? "Untitled Event"}</h1>
      <h2>{resolvedSingleEvent.eventDesc ?? ""}</h2>
      {!resolvedSingleEvent.active && (
        <Alert variant="warning">This Noodle is closed.</Alert>
      )}
      <Stack>
        <form>
          {Object.keys(participants).length > 0 && (
            <DateTable
              participants={participants}
              dates={resolvedSingleEvent.dates}
              eventUUID={params.eventUUID}
              resolvedSingleEvent={resolvedSingleEvent}
            >
              <Participants participants={participants} dates={datesArray} />
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
          )}

          {resolvedSingleEvent.active && (
            <div id="submitButtonContainer">
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          )}
        </form>
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
          <p>
            <Spinner></Spinner>Loading...
          </p>
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
