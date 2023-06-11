import React from "react";

export const Date = ({ date }) => {
  console.log(date);

  return (
    <>
      {date.date}:
      {date.participants.map((participant) => {
        return participant.name + ", ";
      })}
    </>
  );
};
