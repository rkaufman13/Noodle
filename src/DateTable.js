import React, { useState } from "react";
import { Stack, Table, Button } from "react-bootstrap";
import { PersonRow } from "./PersonRow";
import { AddNewRow } from "./AddNewRow";
import { submitPayload } from "./firebase/index";

export const DateTable = ({ participants, dates, eventUUID }) => {
  const [name, setName] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const participantsArray = Object.keys(participants);
  const handleSubmit = () => {
    const payload = { eventUUID: eventUUID, name: name, dates: availableDates };
    submitPayload(payload);

    //clearForm()
  };

  const handleNameUpdate = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <Stack>
        <form>
          <Table responsive="lg">
            <thead></thead>
            <tbody>
              {participantsArray.map((participant, idx) => {
                return (
                  <PersonRow
                    participant={participants[participant]}
                    dates={dates}
                    key={idx}
                  />
                );
              })}
              <AddNewRow
                dates={dates}
                name={name}
                handleNameUpdate={handleNameUpdate}
                availableDates={availableDates}
                setAvailableDates={setAvailableDates}
              />
            </tbody>
          </Table>
          <div id="submitButtonContainer">
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </Stack>
    </>
  );
};
