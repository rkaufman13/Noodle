import React from "react";
import { Table } from "react-bootstrap";
import { convertTimeStampToFormattedDate } from "./util";

export const DateTable = (props) => {
  return (
    <>
      <Table aria-roledescription="Attendee Table" responsive="lg" bordered striped className="p-2">
        <tbody>
          <tr>
            <th scope="col"><span className="visually-hidden">Attendee Name</span></th>
            {props.dates.map((date) => {
              return (
                <th scope="col" key={date}>{convertTimeStampToFormattedDate(date)}</th>
              );
            })}
          </tr>
          {props.children}
        </tbody>
      </Table>
    </>
  );
};
