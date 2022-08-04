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
import styles from "./CalendarBody.module.css";

const CalendarBody = ({
  currentMonth,
  selectedDate,
  onDateClick,
  rewardDate,
}) => {
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
        <div
          className={`${styles.col} ${
            !isSameMonth(day, monthStart)
              ? styles.disabled
              : isSameDay(day, selectedDate)
              ? styles.selected
              : format(currentMonth, "M") !== format(day, "M")
              ? styles.not_valid
              : styles.valid
          }`}
          onClick={() => onDateClick(parse(cloneDay))}
          key={day}
        >
          <span
            className={`${styles.text} ${
              format(currentMonth, "M") !== format(day, "M")
                ? styles.not_valid
                : ""
            }`}
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className={styles.row} key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className={styles.body}>{rows}</div>;
};

export default CalendarBody;
