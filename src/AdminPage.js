import React, { useState } from "react";
import { getSingleAdminEvent, closeEvent, deleteEvent } from "./firebase";
import { useLoaderData, Await, defer, useAsyncValue } from "react-router-dom";
import { Button, Stack, Modal, Alert } from "react-bootstrap";
import { DateTable } from "./DateTable";
import { EmptyEvent } from "./EmptyEvent";
import { reverseObject, setTabFocus, clearTabFocus } from "./util";
import { useNavigate } from "react-router";
import { convertTimeStampToDate } from "./util";

export const adminLoader = ({ params }) => {
  const singleEventPromise = getSingleAdminEvent(params.secretUUID);
  return defer({ singleEvent: singleEventPromise });
};

const AdminChild = () => {
  const resolvedAdminEvent = useAsyncValue();
  const eventKey = Object.keys(resolvedAdminEvent);
  const finalAdminEvent = resolvedAdminEvent[eventKey[0]];
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const participants = reverseObject(finalAdminEvent);
  const [shareUrlVisible, setShareUrlVisible] = useState(false);
  const [closeModalVisible, setCloseModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const toggleShare = () => {
    setShareUrlVisible(!shareUrlVisible);
  };

  const toggleClose = () => {
    setCloseModalVisible(!closeModalVisible);
    setDeleteModalVisible(false);
    setSuccessMessage("Noodle successfully closed.");
    setTabFocus('.modal');
  };

  const toggleDelete = () => {
    setDeleteModalVisible(!deleteModalVisible);
    setCloseModalVisible(false);
    setTabFocus('.modal');
  };

  const handleCloseEvent = () => {
    setCloseModalVisible(false);
    closeEvent(eventKey);
    clearTabFocus();
  };

  const handleDeleteEvent = () => {
    setDeleteModalVisible(false);
    deleteEvent(eventKey);
    navigate("/");
    clearTabFocus();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${baseUrl}/event/${eventKey}`).then(() => {
      //popup "copied" message
    });
  };

  return (
    <>
      <h1>{finalAdminEvent.eventname}</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <div>
        This is your admin page for your Nood. You can visit this page at any
        time by visiting this url: {`${baseUrl}/admin/${finalAdminEvent.admin}`}
        DO NOT LOSE THIS URL OR SHARE IT WITH ANYONE.
      </div>
      <div>
        Your Nood is currently{" "}
        {finalAdminEvent.status.toUpperCase() ?? "Unknown"}.{" "}
      </div>

      {shareUrlVisible && (
        <>
          <div>Share this link with your friends.</div>
          <input type="text" value={`${baseUrl}/event/${eventKey}`} disabled />
          <Button variant="secondary" onClick={copyLink}>
            Copy Link
          </Button>
        </>
      )}

      <div>
        From here you can:
        <Stack direction="horizontal" gap={3}>
          <Button variant="primary" onClick={toggleShare}>
            Share your Nood
          </Button>
          <Button
            variant="primary"
            onClick={toggleClose}
            disabled={finalAdminEvent.status === "inactive"}
          >
            Close Your Nood
          </Button>
          <Button variant="primary" onClick={toggleDelete}>
            Delete your Nood
          </Button>
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
      <Modal
        show={closeModalVisible}
        onHide={() => {setCloseModalVisible(false); clearTabFocus();}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Close your Nood?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you close your event now, no further responses can be added.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {setCloseModalVisible(false); clearTabFocus();}}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCloseEvent}>
            Close it!
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={deleteModalVisible}
        onHide={() => {setDeleteModalVisible(false); clearTabFocus()}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete your Nood?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your Nood will auto-delete on{" "}
          {convertTimeStampToDate(finalAdminEvent.deleteAt)}.
          <br />
          If you'd like to delete it sooner, you may do so below.
          <br />
          Warning: Deleting your Nood is immediate and irreversible!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {setDeleteModalVisible(false); clearTabFocus()}}
          >
            Never Mind
          </Button>
          <Button variant="primary" onClick={handleDeleteEvent}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
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
