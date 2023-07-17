import React from "react";

export const PersonRow = (props) => {
  return (
    <tr>
      <td className={props.active ? "activated" : ""}>
        {props.participantName}
      </td>
      {props.dates.map((date, idx) => {
        const selected = props.participant.dates[date] === "yes";
        return (
          <td
            className={
              props.active
                ? "activated"
                : selected
                ? "goingPrimary"
                : "notGoing"
            }
            key={idx}
          >
            {selected ? "Going" : "Not going"}
          </td>
        );
      })}
    </tr>
  );
};
