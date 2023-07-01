import React from "react";
import { getSingleAdminEvent } from "./firebase";
import {
  useLoaderData,
  Await,
  defer,
  useAsyncValue,
  useParams,
} from "react-router-dom";

export const adminLoader = ({ params }) => {
  const singleEventPromise = getSingleAdminEvent(params.secretUUID);
  return defer({ singleEvent: singleEventPromise });
};

const AdminChild = () => {
  const resolvedAdminEvent = useAsyncValue();
  console.log(resolvedAdminEvent);
  return <></>;
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
