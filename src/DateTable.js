import React from "react";
import { Table } from "react-bootstrap";
import { convertTimeStampToDate } from "./util";

export const DateTable = (props) => {
  const datesArray = Object.keys(props.dates);
  return (
    <>
      <Table aria-roledescription="Attendee Table" responsive="lg" bordered>
        <tbody>
          <tr>
            <th scope="col">Attendee Name</th>
            {datesArray.map((date) => {
              return <th scope="col" key={date}>{convertTimeStampToDate(date)}</th>;
            })}
          </tr>
          {props.children}
        </tbody>
      </Table>
    </>
  );
};
