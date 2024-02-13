import React from "react";
import { GoingIcon } from "./resources/GoingIcon";
import { NotGoingIcon } from "./resources/NotGoingIcon";

export const PersonRow = ({ active, participantName, dates, participant }: { active: boolean, participantName: string, dates: number[], participant: any }) => {
  return (
    <tr>
      <th scope="row" aria-label="Attendee" className={active ? "activated" : ""}>
        {participantName}
      </th>
      {dates.map((date, idx) => {
        const selected = participant.dates[date] === "yes";
        return (
          <td className={active ? "activated" : ""} aria-label={participantName + (selected ? " can " : " cannot ") + "attend the event on this date"} key={idx}>
            {selected ? <GoingIcon /> : <NotGoingIcon />}
          </td>
        );
      })}
    </tr>
  );
};
