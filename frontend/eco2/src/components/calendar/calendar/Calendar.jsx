import { addMonths, format, subMonths } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { calendar } from "../../../store/user/accountSlice";
import { getUserId } from "../../../store/user/common";
import CalendarBody from "../calendarBody/CalendarBody";
import CalendarDays from "../calendarDays/CalendarDays";
import CalendarHeader from "../calendarHeader/CalendarHeader";
import styles from "./Calendar.module.css";

const Calendar = ({ id }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rewardDate, setRewardDate] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  useEffect(() => {
    dispatch(calendar({ id: params.userId })).then((res) => {
      if (res.payload.status === 200) {
        setRewardDate(res.payload.calendarList);
      }
    });
  }, [id, params?.userId]);
  return (
    <div className={styles.container}>
      <CalendarHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <CalendarDays />
      <CalendarBody currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={onDateClick} rewardDate={rewardDate} />
    </div>
  );
};

export default Calendar;
