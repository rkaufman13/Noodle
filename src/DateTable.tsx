import React from "react";
import { Table } from "react-bootstrap";
import { weekdays, months } from './util';

const ConvertTimeStampToFormattedDate = ({ timestamp }: any) => {
  const newDate = new Date(timestamp * 1000);
  return (
    <>
      <div className="weekday text-center text-uppercase">
        {weekdays[newDate.getDay()]}
      </div>
      <div className="month text-center text-uppercase text-lg fs-5">
        {months[newDate.getMonth()]}
      </div>
      <div className="date text-center text-uppercase text-lg fs-3">
        {newDate.getDate()}
      </div>
    </>
  );
};
//todo
export const DateTable = (props: any) => {
  return (
    <>
      <Table
        aria-roledescription="Attendee Table"
        responsive="lg"
        bordered
        striped
        className="p-2"
      >
        <tbody>
          <tr>
            <th scope="col">
              <span className="visually-hidden">Attendee Name</span>
            </th>
            {props.dates.map((date: string) => {
              return (
                <th scope="col" key={date}>
                  {<ConvertTimeStampToFormattedDate timestamp={date} />}
                </th>
              );
            })}
          </tr>
          {props.children}
        </tbody>
      </Table>
    </>
  );
};
