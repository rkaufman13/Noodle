import React, { EventHandler, SyntheticEvent } from "react";
import { convertTimeStampToDate } from "./util";
import { Form } from "react-bootstrap";
import { GoingIcon } from "./resources/GoingIcon";
import { NotGoingIcon } from "./resources/NotGoingIcon";

type AddNewRowProps = {
  dates: number[],
  availableDates: number[],
  setAvailableDates: React.Dispatch<React.SetStateAction<number[]>>,
  handleNameUpdate: React.ChangeEventHandler,
  name: string,
}



export const AddNewRow: React.FC<AddNewRowProps> = ({
  dates,
  availableDates,
  setAvailableDates,
  handleNameUpdate,
  name,
}) => {

  const isKeyboardEvent = (event: React.MouseEvent | React.ChangeEvent | React.KeyboardEvent | React.FormEvent): event is React.KeyboardEvent => {
    return (event as React.KeyboardEvent).key !== undefined;
  }

  const handleClickEvent: EventHandler<SyntheticEvent> = (e: React.MouseEvent | React.ChangeEvent | React.KeyboardEvent | React.FormEvent) => {
    if (e.type !== 'mousedown' && e.type !== 'keyboard') return;
    if (isKeyboardEvent(e) && (e.key === " " || e.key === "Enter")) {
      return;
    }

    let targetDate: string | undefined;
    if (!(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLLabelElement)) {
      return;
    }
    if (e.target instanceof HTMLInputElement) {
      targetDate = e.target.name
    }
    else if (e.target instanceof HTMLLabelElement) {
      targetDate = e.target.htmlFor;
    }

    if (targetDate === undefined) {
      return;
    }

    let newArray: number[] = [];

    const targetDateInt = parseInt(targetDate);
    if (!availableDates.includes(targetDateInt) && !isNaN(targetDateInt)) {
      newArray = [...availableDates, targetDateInt];
    } else {
      newArray = availableDates.filter((item) => item !== targetDateInt);
    }
    setAvailableDates(newArray);
  };

  return (
    <tr id="addnewrow">
      <td>
        <label htmlFor="attendeename" className="visually-hidden">
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
          maxLength={100}
        />
      </td>
      {dates.map((date: number) => {
        return (
          <td key={date} className="checkboxlabel checkbox-circle">
            <input
              type="checkbox"
              name={date.toString()}
              id={date.toString()}
              onChange={handleClickEvent}
              checked={availableDates.includes(date)}
            />
            <label
              tabIndex={0}
              className="checkboxlabel p-1"
              htmlFor={date.toString()}
              onClick={handleClickEvent}
              onKeyDown={handleClickEvent}
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
