import React from "react";
import { getSingleEvent } from "./firebase";
import { DateTable } from "./DateTable";

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

const reverseObject = (event) => {
  const participantsObj = {};

  const datesArray = Object.keys(event.dates);

  datesArray.forEach((date) => {
    event.dates[date].participants.forEach((participant) => {
      if (participantsObj[participant]?.dates) {
        participantsObj[participant].dates[date] = "yes";
      } else {
        participantsObj[participant] = {};
        participantsObj[participant]["dates"] = {};
        participantsObj[participant]["dates"][date] = "yes";
      }
    });
  });
  console.log(participantsObj);
  return participantsObj;
};

const EventChild = () => {
  const resolvedSingleEvent = useAsyncValue(); //this gives us an object organized by date
  //the below gives us an array of objects organized by participant
  //we're not storing this in a smart, relational database sort of way because we want the participants' names and identities to completely disappear when the event is closed/deleted. #privacy!
  const datesArray = Object.keys(resolvedSingleEvent.dates);

  const participants = reverseObject(resolvedSingleEvent);
  console.log(participants);
  //  because of the above silly way we're storing data, we now have to map over the participants object and insert the dates that the participant *can't* attend, for use later when we build the table

  datesArray.forEach((date) => {
    participants.forEach((participant) => {
      if (Object.keys(participant).includes(date)) {
        //do nothing
      } else {
        participant[date] = "no";
      }
    });
  });

  console.log(participants);
  const params = useParams();

  return (
    <>
      <h1>{resolvedSingleEvent.eventname}</h1>
      <div>
        <DateTable
          participants={participants}
          dates={resolvedSingleEvent.dates}
          eventUUID={params.eventUUID}
        />
      </div>
    </>
  );
};

export const EventPage = () => {
  const data = useLoaderData();

  return (
    <>
      <React.Suspense fallback={<p>Loading...</p>}>
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
