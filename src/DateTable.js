import React from "react";
import { Table } from "react-bootstrap";
import { convertTimeStampToDate } from "./util";

export const DateTable = (props) => {
  const datesArray = Object.keys(props.dates);
  return (
    <>
      <Table responsive="lg" bordered>
        <thead>
          <tr>
            <td></td>
            {datesArray.map((date) => {
              return <td key={date}>{convertTimeStampToDate(date)}</td>;
            })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </>
  );
};
