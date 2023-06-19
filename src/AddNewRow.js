import React from "react";

export const AddNewRow = (props) => {
  const datesArray = Object.keys(props.dates);

  const handleClick = (e) => {
    let newArray = [];
    let targetDate = e.target.name ?? e.target.htmlFor;
    if (!props.availableDates.includes(targetDate)) {
      newArray = [...props.availableDates, targetDate];
    } else {
      newArray = props.availableDates.filter((item) => item !== targetDate);
    }
    props.setAvailableDates(newArray);
  };

  return (
    <tr id="addnewrow">
      <td>
        <input
          name="attendeename"
          type="text"
          placeholder="Your Name"
          onChange={props.handleNameUpdate}
          value={props.name || ""}
          required
        ></input>
      </td>
      {datesArray.map((date) => {
        return (
          <td key={date} className="checkboxlabel">
            <input
              type="checkbox"
              name={date}
              onChange={handleClick}
              checked={props.availableDates.includes(date)}
            />
            <label
              className="checkboxlabel"
              htmlFor={date}
              onClick={handleClick}
              name={date}
            >
              {props.availableDates.includes(date) ? "Going" : "not going"}
            </label>
          </td>
        );
      })}
    </tr>
  );
};
