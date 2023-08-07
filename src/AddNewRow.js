import React from "react";
import key from "ally.js/when/key";
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
  const handleKey = (e) => {
    if (e.target.className === "checkboxlabel") {
      e.preventDefault();
      e.target.click(); // This is a dirty way to code this but I'm too lazy to figure out a better way right now and we can fix later
    }
  };
  key({
    space: (e) => {
      handleKey(e);
    },
    enter: (e) => {
      handleKey(e);
    },
  });

  return (
    <tr id="addnewrow">
      <td>
        <Form.Control
          name="attendeename"
          type="text"
          placeholder="Your Name"
          onChange={handleNameUpdate}
          value={name || ""}
          required
          id="addName"
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
              className="checkboxlabel"
              htmlFor={date}
              onClick={handleClick}
              name={date}
            >
              {availableDates.includes(date) ? <GoingIcon /> : <NotGoingIcon />}
            </label>
          </td>
        );
      })}
    </tr>
  );
};
