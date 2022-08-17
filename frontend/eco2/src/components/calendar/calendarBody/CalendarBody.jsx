import { isSameMonth, startOfMonth, endOfMonth, endOfWeek, startOfWeek, isSameDay, addDays, format } from "date-fns";
import { parse } from "date-fns/fp";
import React, { useRef, useState } from "react";
import CalendarModal from "../calendarModal/CalendarModal";
import styles from "./CalendarBody.module.css";
const CalendarBody = ({ currentMonth, selectedDate, onDateClick, rewardDate }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const [modalVisible, setModalVisible] = useState(false);
  const [clickedDay, setClickedDay] = useState(0);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  const rewardList = rewardDate.filter((it) => {
    return it?.date.split("-")[0] === format(currentMonth, "yyyy") && it?.date.split("-")[1] === format(currentMonth, "MM");
  });

  let rewardDays = [];
  for (let d = 0; d <= format(monthEnd, "dd") - format(monthStart, "dd") + 1; d++) {
    rewardDays.push(0);
  }
  for (let j = 0; j < rewardList.length; j++) {
    rewardDays[Number(rewardList[j].date.split("-")[2])] = rewardList[j].id;
  }

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
          onClick={(e) => {
            onDateClick(parse(cloneDay));
            setModalVisible(!modalVisible);
            setClickedDay(format(cloneDay, "d"));
          }}
          key={day}
        >
          <span
            className={`${styles.text} ${format(currentMonth, "M") !== format(day, "M") ? styles.not_valid : ""} ${i === 0 ? styles.red : null}
                `}
          >
            {formattedDate}
          </span>
          {!!rewardDays[formattedDate] && (
            <img src={process.env.PUBLIC_URL + "/tree_leaves/" + "Leaf" + ((rewardDays[formattedDate] % 6) + 1) + ".png"} alt="" className={styles.img} />
          )}
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

  return (
    <>
      <div className={styles.body}>{rows}</div>
      {modalVisible && !!clickedDay && !!rewardDays[clickedDay] && (
        <CalendarModal
          calendarId={rewardDays[clickedDay]}
          month={format(currentMonth, "M")}
          day={clickedDay}
          closeModal={() => setModalVisible(!modalVisible)}
        />
      )}
    </>
  );
};

export default CalendarBody;
