import React from "react";
import { convertTimeStampToDateString } from "./util";

export const BestDay = ({ dates }) => {
  const datesArray = Object.keys(dates);
  let mostVotes = 0;
  let bestDay = [];
  for (let date of datesArray) {
    if (dates[date].participants.length > mostVotes) {
      bestDay = [date];
      mostVotes = dates[date].participants.length;
    } else if (dates[date].participants.length === mostVotes) {
      bestDay.push(date);
    }
  }

  return (
    <tr>
      <td colSpan="100">
        {bestDay.length === 1 ? (
          <p>
            The people have spoken. The best day for your event is{" "}
            {convertTimeStampToDateString(bestDay[0])}!
          </p>
        ) : (
          <>
            There's no clear best day yet; why don't you share your event with
            more people or remind your friends to respond?
          </>
        )}
      </td>
    </tr>
  );
};
