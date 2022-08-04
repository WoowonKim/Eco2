import { addMonths, format, subMonths } from "date-fns";
import React, { useState } from "react";
import CalendarBody from "../calendarBody/CalendarBody";
import CalendarDays from "../calendarDays/CalendarDays";
import CalendarHeader from "../calendarHeader/CalendarHeader";
import styles from "./Calendar.module.css";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };
  return (
    <div className={styles.container}>
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <CalendarDays />
      <CalendarBody
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};

export default Calendar;
