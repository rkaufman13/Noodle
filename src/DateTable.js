import React from "react";
import { Table } from "react-bootstrap";
import { convertTimeStampToFormattedDate } from "./util";

export const DateTable = (props) => {
  return (
    <>
      <Table responsive="lg" bordered className="p-2">
        <thead>
          <tr>
            <td></td>
            {props.dates.map((date) => {
              return (
                <td key={date}>{convertTimeStampToFormattedDate(date)}</td>
              );
            })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </Table>
    </>
  );
};
