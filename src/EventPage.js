import React from "react";
import { getSingleEvent } from "./firebase";
import { DateTable } from "./DateTable";
import { useLoaderData, Await, defer, useAsyncValue } from "react-router-dom";

export const loader = ({ params }) => {
  const singleEventPromise = getSingleEvent(params.eventUUID);
  return defer({ singleEvent: singleEventPromise });
};

const reverseObject = (event) => {
  const participants = [];
  event.dates.forEach((date) => {
    date.participants.forEach((participant) => {
      const participantIndex = participants.findIndex(
        (participantToSearch) => participant.name == participantToSearch.name
      );
      if (participantIndex > -1) {
        participants[participantIndex][date.date] = "yes";
      } else {
        participants.push(
          Object.fromEntries([
            ["name", participant.name],
            [date.date, "yes"],
          ])
        );
      }
    });
  });
  return participants;
};

const EventChild = () => {
  const resolvedSingleEvent = useAsyncValue(); //this gives us an object organized by date
  //the below gives us an array of objects organized by participant
  //we're not storing this in a smart, relational database sort of way because we want the participants' names and identities to completely disappear when the event is closed/deleted. #privacy!

  const participants = reverseObject(resolvedSingleEvent);

  //  because of the above silly way we're storing data, we now have to map over the participants object and insert the dates that the participant *can't* attend, for use later when we build the table
  resolvedSingleEvent.dates.forEach((date) => {
    participants.forEach((participant) => {
      if (date.date in participant) {
        //do nothing
      } else {
        participant[date.date] = "no";
      }
    });
  });

  return (
    <>
      <h1>{resolvedSingleEvent.eventname}</h1>
      <div>
        <DateTable
          participants={participants}
          dates={resolvedSingleEvent.dates}
        />
        ;
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
