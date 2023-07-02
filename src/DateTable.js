import React, { useState } from "react";
import { Stack, Table, Button } from "react-bootstrap";
import { PersonRow } from "./PersonRow";
import { AddNewRow } from "./AddNewRow";
import { submitPayload } from "./firebase/index";
import { convertTimeStampToDate } from "./util";
import { useNavigate } from "react-router";

export const DateTable = ({ participants, dates, eventUUID }) => {
  const [name, setName] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const participantsArray = Object.keys(participants);
  const navigate = useNavigate();

  const clearForm = () => {
    setName("");
    setAvailableDates([]);
    //refresh the page
    navigate(0);
  };

  const handleSubmit = () => {
    //todo disallow duplicates
    for (const date of availableDates) {
      dates[date].participants.push(name);
    }
    const payload = {
      eventUUID,
      dates,
    };
    submitPayload(payload);

    clearForm();
  };

  const handleNameUpdate = (e) => {
    setName(e.target.value);
  };

  const datesArray = Object.keys(dates);

  return (
    <>
      <Stack>
        <form>
          <Table responsive="lg" bordered>
            <thead></thead>
            <tbody>
              <tr>
                <td></td>
                {datesArray.map((date) => {
                  return <td key={date}>{convertTimeStampToDate(date)}</td>;
                })}
              </tr>
              {participantsArray.map((participant, idx) => {
                return (
                  <PersonRow
                    participant={participants[participant]}
                    participantName={participant}
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
