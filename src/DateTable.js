import React from "react";
import { Table } from "react-bootstrap";
import { convertTimeStampToDate } from "./util";

export const DateTable = (props) => {
  return (
    <>
      <Table responsive="lg" bordered>
        <thead>
          <tr>
            <td></td>
            {props.dates.map((date) => {
              return <td key={date}>{convertTimeStampToDate(date)}</td>;
            })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </>
  );
};
