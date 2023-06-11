import React from "react";
import { getSingleEvent } from "./firebase";
import { Date } from "./Date";
import { useLoaderData, Await, defer, useAsyncValue } from "react-router-dom";

export const loader = ({ params }) => {
  const singleEventPromise = getSingleEvent(params.eventUUID);
  return defer({ singleEvent: singleEventPromise });
};

const EventChild = () => {
  const resolvedSingleEvent = useAsyncValue();

  return (
    <>
      <h1>{resolvedSingleEvent.eventname}</h1>
      <div>
        {console.log(resolvedSingleEvent.dates)}
        {resolvedSingleEvent.dates.map((date, idx) => {
          return <Date date={date} key={idx} />;
        })}
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
