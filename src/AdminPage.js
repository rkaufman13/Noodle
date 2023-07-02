import React from "react";
import { getSingleAdminEvent } from "./firebase";
import { useLoaderData, Await, defer, useAsyncValue } from "react-router-dom";
import { Button, Stack } from "react-bootstrap";
import { DateTable } from "./DateTable";
import { EmptyEvent } from "./EmptyEvent";
import { reverseObject } from "./util";

export const adminLoader = ({ params }) => {
  const singleEventPromise = getSingleAdminEvent(params.secretUUID);
  return defer({ singleEvent: singleEventPromise });
};

const AdminChild = () => {
  const resolvedAdminEvent = useAsyncValue();
  const eventKey = Object.keys(resolvedAdminEvent);
  const finalAdminEvent = resolvedAdminEvent[eventKey[0]];
  const baseUrl = process.env.REACT_APP_BASE_URL; //todo fix
  const participants = reverseObject(finalAdminEvent);

  return (
    <>
      <h1>{finalAdminEvent.eventname}</h1>
      <div>
        This is your admin page for your Nood. You can visit this page at any
        time by visiting this url:{" "}
        {`https://${baseUrl}/admin/${finalAdminEvent.admin}`}
        DO NOT LOSE THIS URL OR SHARE IT WITH ANYONE.
      </div>
      <div>
        From here you can:
        <Stack direction="horizontal">
          <Button variant="primary">Share your Nood</Button>
          <Button variant="primary">Close your Nood</Button>
          <Button variant="primary">Delete your Nood</Button>
        </Stack>
      </div>
      <div>
        <div>
          {Object.keys(participants).length > 0 ? (
            <DateTable
              participants={participants}
              dates={finalAdminEvent.dates}
              eventUUID={finalAdminEvent.uuid}
            />
          ) : (
            <EmptyEvent dates={finalAdminEvent.dates} />
          )}
        </div>
      </div>
    </>
  );
};

export const AdminPage = () => {
  const data = useLoaderData();

  return (
    <>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={data.singleEvent}
          errorElement={<p>An error occurred</p>}
        >
          <AdminChild />
        </Await>
      </React.Suspense>
    </>
  );
};
