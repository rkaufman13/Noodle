import React, { useState } from "react";
import { Stack, Table, Button } from "react-bootstrap";
import { PersonRow } from "./PersonRow";
import { AddNewRow } from "./AddNewRow";

export const DateTable = ({ participants, dates }) => {
  const [availableDates, setAvailableDates] = useState();

  const handleSubmit = () => {
    console.log("button clicked");
  };

  const handleUpdate = () => {
    console.log("dude idk");
  };

  return (
    <>
      <Stack>
        <form>
          <Table responsive="lg">
            <thead></thead>
            <tbody>
              {participants.map((participant) => {
                return <PersonRow participant={participant} dates={dates} />;
              })}
              <AddNewRow
                dates={dates}
                handleUpdate={handleUpdate}
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
