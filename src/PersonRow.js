import React from "react";
import { convertTimeStampToDate } from "./util";

export const PersonRow = (props) => {
  const datesArray = Object.keys(props.dates);
  console.log(props);
  return (
    <tr>
      <td>{props.participantName}</td>
      {datesArray.map((date, idx) => {
        const selected = props.participant.dates[date] === "yes";
        return (
          <td
            style={{ backgroundColor: selected ? "green" : "gray" }}
            key={idx}
          >
            {selected ? "Going" : "Not going"}
          </td>
        );
      })}
    </tr>
  );
};
