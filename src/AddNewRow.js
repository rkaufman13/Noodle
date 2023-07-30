import React from "react";
import { convertTimeStampToDate } from "./util";

export const AddNewRow = ({
  dates,
  availableDates,
  setAvailableDates,
  handleNameUpdate,
  name,
}) => {
  const handleClick = (e) => {
    if (e.type === "keydown" && !(e.keyCode === 32 || e.keyCode === 13)) {
      return;
    };
    let newArray = [];
    let targetDate = e.target.name ?? e.target.htmlFor;
    targetDate = parseInt(targetDate);
    if (!availableDates.includes(targetDate)) {
      newArray = [...availableDates, targetDate];
    } else {
      newArray = availableDates.filter((item) => item !== targetDate);
    }
    setAvailableDates(newArray);
  };

  return (
    <tr id="addnewrow">
      <td>
        <label for="attendeename" className="visually-hidden">Enter your name</label>
        <input
          name="attendeename"
          id="attendeename"
          type="text"
          placeholder="Your Name"
          onChange={handleNameUpdate}
          value={name || ""}
          className="rounded p-1"
          required
        ></input>
      </td>
      {dates.map((date) => {
        return (
          <td key={date} className="checkboxlabel">
            <input
              type="checkbox"
              name={date}
              onChange={handleClick}
              checked={availableDates.includes(date)}
            />
            <label
              tabIndex={0}
              className="checkboxlabel p-1"
              htmlFor={date}
              onClick={handleClick}
              onKeyDown={handleClick}
              name={date}
              role="checkbox"
              aria-checked={availableDates.includes(date) ? "true" : "false"}
              aria-label={availableDates.includes(date) ? "You can attend the event on " + convertTimeStampToDate(date) : "You cannot attend the event on " + convertTimeStampToDate(date)}
            >
              {availableDates.includes(date) ? "Going" : "Not going"}
            </label>
          </td>
        );
      })}
    </tr>
  );
};
