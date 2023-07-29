import React, { useState } from "react";
import { getSingleAdminEvent, closeEvent, deleteEvent } from "./firebase";
import { useLoaderData, Await, defer, useAsyncValue } from "react-router-dom";
import {
  Button,
  Stack,
  Modal,
  Alert,
  Row,
  Container,
  Spinner,
} from "react-bootstrap";
import { DateTable } from "./DateTable";
import { EmptyEvent } from "./EmptyEvent";
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
  const [successMessage, setSuccessMessage] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");
  const [finalAdminEvent, eventKey] = useAsyncValue();

  if (!finalAdminEvent) {
    return (
      <p>
        There's nothing here! Either you've entered in an incorrect URL, or
        tried to access a Noodle after it was deleted, or something else went
        wrong. If you think there should be something here, get in touch.
      </p>
    );
  }

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const participants = reverseObject(finalAdminEvent);

  const toggleShare = () => {
    setShareUrlVisible(!shareUrlVisible);
    if (shareUrlVisible) {
      setCopyButtonText("Copy Link");
    }
  };

  const toggleClose = () => {
    setCloseModalVisible(!closeModalVisible);
    setDeleteModalVisible(false);
    setSuccessMessage("Noodle successfully closed.");
    setTabFocus(".modal");
  };

  const toggleDelete = () => {
    setDeleteModalVisible(!deleteModalVisible);
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

  const copyLink = () => {
    navigator.clipboard.writeText(`${baseUrl}/event/${eventKey}`).then(() => {
      setCopyButtonText("Copied!");
    });
  };

  return (
    <>
      <Row>
        <h1>{finalAdminEvent.eventname ?? "Untitled event"}</h1>
        {finalAdminEvent.eventDesc && <h2>{finalAdminEvent.eventDesc}</h2>}
      </Row>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Row>
        This is your admin page for your Nood. You can visit this page at any
        time by visiting this url:
      </Row>
      <Alert variant="info">
        {" "}
        {`${baseUrl}/admin/${finalAdminEvent.admin}`}
      </Alert>
      <Row>
        <p>DO NOT LOSE THIS URL OR SHARE IT WITH ANYONE.</p>
      </Row>
      <Row>
        Your Nood is currently {finalAdminEvent.active ? "ACTIVE" : "CLOSED"}.{" "}
      </Row>
      {shareUrlVisible && (
        <>
          <Container fluid>
            <Row>
              Share this link with your friends.
              <input
                type="text"
                value={`${baseUrl}/event/${eventKey}`}
                disabled
              />
              <Button variant="secondary" onClick={copyLink}>
                {copyButtonText}
              </Button>
            </Row>
          </Container>
        </>
      )}
      <Row>
        From here you can:
        <Stack direction="horizontal" gap={3}>
          <Button variant="primary" onClick={toggleShare} className="ms-auto">
            Share your Nood
          </Button>
          <Button
            variant="primary"
            onClick={toggleClose}
            disabled={finalAdminEvent.active === false}
          >
            Close Your Nood
          </Button>
          <Button variant="primary" onClick={toggleDelete} className="me-auto">
            Delete your Nood
          </Button>
        </Stack>
      </Row>
      <hr className="p-2 invisible" />
      <Row>
        {Object.keys(participants).length > 0 ? (
          <>
            <h2>Your Nood So Far</h2>
            <DateTable
              participants={participants}
              dates={finalAdminEvent.dates}
              eventUUID={finalAdminEvent.uuid}
            />
          </>
        ) : (
          <EmptyEvent dates={finalAdminEvent.dates} />
        )}
      </Row>
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
