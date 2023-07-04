import React, { useState } from "react";
import { Stack, Table, Button } from "react-bootstrap";

import { convertTimeStampToDate } from "./util";

export const EmptyEvent = ({ dates }) => {
  return (
    <>
      <Stack>
        There doesn't appear to be much here yet! Why not send your Nood to your
        friends?
        <Table responsive="lg" bordered>
          <thead></thead>
          <tbody>
            <tr>
              <td></td>
              {dates.map((date) => {
                return <td key={date}>{convertTimeStampToDate(date)}</td>;
              })}
            </tr>
          </tbody>
        </Table>
      </Stack>
    </>
  );
};
