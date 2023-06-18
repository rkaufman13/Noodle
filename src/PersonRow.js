import React from "react";

export const PersonRow = (props) => {
  const datesArray = Object.keys(props.dates);
  return (
    <tr>
      <td>{props.participant.name}</td>
      {datesArray.map((date, idx) => {
        const selected = props.participant.dates[date] === "yes";
        return (
          <td
            style={{ backgroundColor: selected ? "green" : "gray" }}
            key={idx}
          >
            {date}
          </td>
        );
      })}
    </tr>
  );
};
