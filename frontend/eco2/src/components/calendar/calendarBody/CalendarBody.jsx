import {
  isSameMonth,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  isSameDay,
  addDays,
  parse,
  format,
} from "date-fns";
import React from "react";
import styels from "./CalendarBody.module.css";

const CalendarBody = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div onClick={() => onDateClick(parse(cloneDay))}>
          <span>{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div>{days}</div>);
    days = [];
  }
  return <div>{rows}</div>;
};

export default CalendarBody;
