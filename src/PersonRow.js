import React from "react";

export const PersonRow = (props) => {
  return (
    <tr>
      <th scope="row" aria-label="Attendee">{props.participantName}</th>
      {props.dates.map((date, idx) => {
        const selected = props.participant.dates[date] === "yes";
        return (
          <td className={selected ? "goingPrimary" : "notGoing"} aria-label={props.participantName + (selected ? " can " : " cannot ") + "attend the event on this date"} key={idx}>
            {selected ? "Going" : "Not going"}
          </td>
        );
      })}
    </tr>
  );
};
