import React from "react";
import { convertTimeStampToDate } from "./util";
import { Form } from "react-bootstrap";
import { GoingIcon } from "./resources/GoingIcon";
import { NotGoingIcon } from "./resources/NotGoingIcon";

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
    }
    let newArray = [];
    let targetDate = e.target.name ?? e.target.htmlFor;
    targetDate = parseInt(targetDate);
    if (!availableDates.includes(targetDate) && !isNaN(targetDate)) {
      newArray = [...availableDates, targetDate];
    } else {
      newArray = availableDates.filter((item) => item !== targetDate);
    }
    setAvailableDates(newArray);
  };

  return (
    <tr id="addnewrow">
      <td>
        <label for="attendeename" className="visually-hidden">
          Enter your name
        </label>
        <Form.Control
          name="attendeename"
          type="text"
          placeholder="Your Name"
          onChange={handleNameUpdate}
          value={name || ""}
          className="form-control rounded p-1"
          aria-labelledby="attendeename"
          required
          id="addName"
          maxlength="100"
        />
      </td>
      {dates.map((date) => {
        return (
          <td key={date} className="checkboxlabel checkbox-circle">
            <input
              type="checkbox"
              name={date}
              id={date}
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
              aria-label={
                availableDates.includes(date)
                  ? "You can attend the event on " +
                    convertTimeStampToDate(date) +
                    ". Check this box to RSVP no."
                  : "You cannot attend the event on " +
                    convertTimeStampToDate(date) +
                    ". Check this box to RSVP yes."
              }
            >
              {availableDates.includes(date) ? <GoingIcon /> : <NotGoingIcon />}
            </label>
          </td>
        );
      })}
    </tr>
  );
};
