import React from "react";
import { getSingleEvent } from "./firebase";
import { DateTable } from "./DateTable";
import { EmptyEvent } from "./EmptyEvent";
import { reverseObject } from "./util";

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
  const resolvedSingleEvent = useAsyncValue(); //this gives us an object organized by date
  //the below gives us an array of objects organized by participant
  //we're not storing this in a smart, relational database sort of way because we want the participants' names and identities to completely disappear when the event is closed/deleted. #privacy!
  const datesArray = Object.keys(resolvedSingleEvent.dates);

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

  return (
    <>
      <h1>{resolvedSingleEvent.eventname}</h1>
      <div>
        {Object.keys(participants).length > 0 ? (
          <DateTable
            participants={participants}
            dates={resolvedSingleEvent.dates}
            eventUUID={params.eventUUID}
          />
        ) : (
          <EmptyEvent dates={resolvedSingleEvent.dates} />
        )}
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
