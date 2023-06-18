import React from "react";
import { Stack, Table } from "react-bootstrap";
import { PersonRow } from "./PersonRow";

export const DateTable = ({ participants, dates }) => {
  return (
    <>
      <Stack>
        <Table responsive="lg">
          <thead></thead>
          <tbody>
            {participants.map((participant) => {
              return <PersonRow participant={participant} dates={dates} />;
            })}
          </tbody>
        </Table>
      </Stack>
    </>
  );
};
