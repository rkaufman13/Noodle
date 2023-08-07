import React, { useState } from "react";
import {
  getSingleAdminEvent,
  closeEvent,
  deleteEvent,
  deleteEmail,
} from "./firebase";
import { useLoaderData, Await, defer, useAsyncValue } from "react-router-dom";
import { Button, Stack, Modal, Alert, Spinner } from "react-bootstrap";
import { DateTable } from "./DateTable";
import { EmptyEvent } from "./EmptyEvent";
import { Participants } from "./Participants";
import { BestDay } from "./BestDay";
import {
  reverseObject,
  convertTimeStampToDate,
  setTabFocus,
  clearTabFocus,
} from "./util";

export const adminLoader = ({ params }) => {
  const singleEventPromise = getSingleAdminEvent(params.secretUUID);
  return defer({ singleEvent: singleEventPromise });
};

const AdminChild = () => {
  const [shareUrlVisible, setShareUrlVisible] = useState(false);
  const [closeModalVisible, setCloseModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");
  const [finalAdminEvent, eventKey] = useAsyncValue();

  if (!finalAdminEvent) {
    return (
      <>
        <h1>Not Found</h1>
        <p>
          There's nothing here! Either you've entered in an incorrect URL, or
          tried to access a Noodle after it was deleted, or something else went
          wrong. If you think there should be something here, get in touch.
        </p>
      </>
    );
  }

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const participants = reverseObject(finalAdminEvent);
  const datesArray = Object.keys(finalAdminEvent.dates);

  const toggleShare = () => {
    setShareUrlVisible(!shareUrlVisible);
    if (shareUrlVisible) {
      setCopyButtonText("Copy Link");
    }
  };

  const toggleClose = () => {
    setCloseModalVisible(!closeModalVisible);
    setDeleteModalVisible(false);
    setEmailModalVisible(false);
    setSuccessMessage("Noodle successfully closed.");
    setTabFocus(".modal");
  };

  const toggleDelete = () => {
    setDeleteModalVisible(!deleteModalVisible);
    setCloseModalVisible(false);
    setEmailModalVisible(false);
    setTabFocus(".modal");
  };

  const toggleEmail = () => {
    setEmailModalVisible(!emailModalVisible);
    setDeleteModalVisible(false);
    setCloseModalVisible(false);
    setTabFocus(".modal");
  };

  const handleCloseEvent = () => {
    setCloseModalVisible(false);
    closeEvent(eventKey);
    clearTabFocus();
    setSuccessMessage("Noodle successfully closed.");
  };

  const handleDeleteEvent = () => {
    setDeleteModalVisible(false);
    deleteEvent(eventKey);
    clearTabFocus();
    setSuccessMessage(
      "Nood successfully deleted. Once you navigate away from this page it will be gone forever :("
    );
  };

  const handleDeleteEmailEvent = () => {
    setEmailModalVisible(false);
    deleteEmail(eventKey);
    clearTabFocus();
    setSuccessMessage("No more emails!");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${baseUrl}/event/${eventKey}`).then(() => {
      setCopyButtonText("Copied!");
    });
  };
  return (
    <>
      <div>
        <h1>{finalAdminEvent.eventname ?? "Untitled event"}</h1>
        {finalAdminEvent.eventDesc && <h2>{finalAdminEvent.eventDesc}</h2>}
      </div>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <div>
        This is your admin page for your Nood. You can visit this page at any
        time by visiting this url:
      </div>
      <Alert variant="info">
        {" "}
        {`${baseUrl}/admin/${finalAdminEvent.admin}`}
      </Alert>
      <div>
        <p>DO NOT LOSE THIS URL OR SHARE IT WITH ANYONE.</p>
      </div>
      <div>
        Your Nood is currently {finalAdminEvent.active ? "ACTIVE" : "CLOSED"}.{" "}
      </div>
      {finalAdminEvent.active && (
        <>
          <Stack>
            To get responses for your Nood, share this link with your friends.
            <input
              type="text"
              value={`${baseUrl}/event/${eventKey}`}
              disabled
            />
            <Button variant="secondary" onClick={copyLink}>
              {copyButtonText}
            </Button>
          </Stack>
        </>
      )}
      <hr className="p-2 invisible" />
      <div>
        From here you can also:
        <Stack direction="horizontal" gap={3}>
          <Button
            variant="primary"
            onClick={toggleClose}
            disabled={finalAdminEvent.active === false}
            className="ms-auto"
          >
            Close Your Nood
          </Button>
          <Button
            variant="primary"
            onClick={toggleDelete}
            disabled={finalAdminEvent.deleteAt < Math.floor(new Date() / 1000)}
            className="me-auto"
          >
            Delete your Nood
          </Button>
        </Stack>
      </div>
      <hr className="p-2 invisible" />
      <div>
        <h2>Your Nood So Far</h2>
        <DateTable
          participants={participants}
          dates={datesArray}
          eventUUID={finalAdminEvent.uuid}
        >
          {Object.keys(participants).length > 0 ? (
            <>
              {" "}
              <Participants
                participants={participants}
                dates={datesArray}
                activePerson={null}
              />
              <BestDay dates={finalAdminEvent.dates} />
            </>
          ) : (
            <EmptyEvent dates={finalAdminEvent.dates} />
          )}
        </DateTable>
      </div>
      <hr className="p-2 invisible" />
      <div>
        Getting too much email about this event?{" "}
        <Button variant="primary" onClick={toggleEmail} size="sm">
          Stop emailing me about this event
        </Button>
      </div>
      <Modal
        show={closeModalVisible}
        onHide={() => {
          setCloseModalVisible(false);
          clearTabFocus();
        }}
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
            onClick={() => {
              setCloseModalVisible(false);
              clearTabFocus();
            }}
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
        onHide={() => {
          setDeleteModalVisible(false);
          clearTabFocus();
        }}
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
            onClick={() => {
              setDeleteModalVisible(false);
              clearTabFocus();
            }}
          >
            Never Mind
          </Button>
          <Button variant="primary" onClick={handleDeleteEvent}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={emailModalVisible}
        onHide={() => {
          setEmailModalVisible(false);
          clearTabFocus();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Stop emailing me!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Getting too many email RSVPs for this event, but don't want to close
            it yet?
          </p>
          <p>
            We won't send you another email about RSVPs if you click this
            button. You'll need to use the admin link on this page (save it!) to
            track RSVPs going forward.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDeleteModalVisible(false);
              clearTabFocus();
            }}
          >
            Never Mind
          </Button>
          <Button variant="primary" onClick={handleDeleteEmailEvent}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const AdminPage = () => {
  const data = useLoaderData();

  return (
    <React.Suspense
      fallback={
        <>
          <Spinner></Spinner>Loading...
        </>
      }
    >
      <Await resolve={data.singleEvent} errorElement={<p>An error occurred</p>}>
        <AdminChild />
      </Await>
    </React.Suspense>
  );
};
