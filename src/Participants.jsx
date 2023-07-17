import React from "react";
import { PersonRow } from "./PersonRow";

export const Participants = ({participants, dates, activePerson}) => {
  const participantsArray = Object.keys(participants);
  
return  (participantsArray.map((participant, idx) => {
    return (
      <PersonRow
        participant={participants[participant]}
        participantName={participant}
        dates={dates}
        active={participant===activePerson}
        key={idx}
      />
    );
  }))
};
