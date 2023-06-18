import React from "react";

export const PersonRow = (props) => {
  return (
    <tr>
      <td>{props.participant.name}</td>
      {props.dates.map((date, idx) => {
        const selected = props.participant[date.date] === "yes";
        return (
          <td
            style={{ backgroundColor: selected ? "green" : "gray" }}
            key={idx}
          >
            {date.date}
          </td>
        );
      })}
    </tr>
  );
};
