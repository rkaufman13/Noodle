import React from "react";

export const AddNewRow = (props) => {
  const datesArray = Object.keys(props.dates);

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
      {datesArray.map((date) => {
        return (
          <td key={date} className="checkboxlabel">
            <input
              type="checkbox"
              value={date}
              name="attendeedates"
              id={date}
              onClick={handleClick}
            />
            <label className="checkboxlabel" htmlFor={date} id={date}>
              {date}
            </label>
          </td>
        );
      })}
    </tr>
  );
};
