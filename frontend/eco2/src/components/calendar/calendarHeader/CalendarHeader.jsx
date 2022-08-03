import { format } from "date-fns";
import React from "react";
import styles from "./CalendarHeader.module.css";

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <span>
          <span>{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <div>
        <button onClick={prevMonth}>왼</button>
        <button onClick={nextMonth}>오</button>
      </div>
    </div>
  );
};

export default CalendarHeader;
