import React from "react";

export const AddNewRow = (props) => {
  const handleClick = (e) => {
    let newArray = [];
    if (!props.availableDates.includes(e.target.value)) {
      newArray = [...props.availableDates, e.target.value];
    } else {
      newArray = props.availableDates.filter((item) => item !== e.target.value);
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
          value={props.name}
          required
        ></input>
      </td>
      {props.dates.map((date, idx) => {
        return (
          <td key={idx} className="checkboxlabel">
            <input
              type="checkbox"
              value={date.date}
              name="attendeedates"
              id={date.date}
              onClick={handleClick}
            />
            <label className="checkboxlabel" htmlFor={date.date} id={date.date}>
              {date.date}
            </label>
          </td>
        );
      })}
    </tr>
  );
};
