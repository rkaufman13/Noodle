import React from "react";

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
        <input
          name="attendeename"
          type="text"
          placeholder="Your Name"
          onChange={handleNameUpdate}
          value={name || ""}
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
              className="checkboxlabel"
              htmlFor={date}
              onClick={handleClick}
              name={date}
            >
              {availableDates.includes(date) ? "Going" : "not going"}
            </label>
          </td>
        );
      })}
    </tr>
  );
};
