import React from "react";
import { GoingIcon } from "./resources/GoingIcon";
import { NotGoingIcon } from "./resources/NotGoingIcon";

export const PersonRow = (props) => {
  return (
    <tr>
      <th scope="row" aria-label="Attendee" className={props.active ? "activated" : ""}>
        {props.participantName}
      </th>
      {props.dates.map((date, idx) => {
        const selected = props.participant.dates[date] === "yes";
        return (
          <td className={props.active ? "activated" : ""} aria-label={props.participantName + (selected ? " can " : " cannot ") + "attend the event on this date"} key={idx}>
            {selected ? <GoingIcon /> : <NotGoingIcon />}
          </td>
        );
      })}
    </tr>
  );
};
