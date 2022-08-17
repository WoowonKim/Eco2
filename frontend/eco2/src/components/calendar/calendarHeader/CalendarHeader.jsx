import { format } from "date-fns";
import React from "react";
import styles from "./CalendarHeader.module.css";

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className={`${styles.row} ${styles.header}`}>
      <div className={`${styles.col} ${styles.col_start}`}>
        <button className={styles.button} onClick={prevMonth}>
          ◀︎
        </button>
        <span className={styles.text}>
          <span className={`${styles.text} ${styles.month}`}>{format(currentMonth, "M")}월</span>
          {format(currentMonth, "yyyy")}
        </span>
        <button className={styles.button} onClick={nextMonth}>
          ▶︎
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
