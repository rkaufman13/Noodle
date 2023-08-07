import React from "react";
import { GoingIcon } from "./resources/GoingIcon";
import { NotGoingIcon } from "./resources/NotGoingIcon";

export const PersonRow = (props) => {
  return (
    <tr>
      <td className={props.active ? "activated" : ""}>
        {props.participantName}
      </td>
      {props.dates.map((date, idx) => {
        const selected = props.participant.dates[date] === "yes";
        return (
          <td className={props.active ? "activated" : ""} key={idx}>
            {selected ? <GoingIcon /> : <NotGoingIcon />}
          </td>
        );
      })}
    </tr>
  );
};
