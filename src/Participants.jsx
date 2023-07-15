import React from "react";
import { PersonRow } from "./PersonRow";

export const Participants = ({participants, dates}) => {
  const participantsArray = Object.keys(participants);
  
return  (participantsArray.map((participant, idx) => {
    return (
      <PersonRow
        participant={participants[participant]}
        participantName={participant}
        dates={dates}
        key={idx}
      />
    );
  }))
};
