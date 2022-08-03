import React from "react";
import styles from "./CalendarDays.module.css";

const CalendarDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(<div>{date[i]}</div>);
  }
  return <div>{days}</div>;
};

export default CalendarDays;
