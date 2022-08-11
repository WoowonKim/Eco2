import React, { useState, useEffect } from "react";
import styles from "./alarmItem.module.css";
import { useDispatch } from "react-redux";
import { deleteAlarm } from "../../../store/alarm/alarmSlice";

const AlarmItem = ({ alarm }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");

  const getTime = (time) => {
    const now = new Date();
    if (
      time.year == now.getFullYear() &&
      time.monthValue == now.getMonth() + 1 &&
      time.dayOfMonth == now.getDate()
    ) {
      return time.hour + ":" + time.minute;
    } else {
      return time.year + "." + time.monthValue + "." + time.dayOfMonth;
    }
  };

  const getType = (type) => {
    switch (type) {
      case "friendAccept":
        return "친구 수락";
      case "comment":
        return "댓글";
      case "friendPost":
        return "친구 인증글";
      case "report":
        return "신고";
    }
  };

  const onClickDelete = (id, userId) => {
    console.log("delete");
    dispatch(deleteAlarm({ id: id, userId: userId }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.title}>
          <i className={"fa-solid fa-circle-dot icon"}></i>
          <p>{getType(alarm.dtype)}</p>
          <p>{getTime(alarm.sendTime)}</p>
        </div>
        <div className={styles.button}>
          <i
            className={"fa-solid fa-x icon"}
            onClick={() => {
              onClickDelete(alarm.id, alarm.userId);
            }}
          ></i>
        </div>
      </div>
      <div className={styles.content}>
        <img
          className={styles.profileImg}
          src={`http://localhost:8002/img/profile/${alarm.senderId}`}
          alt="profileImg"
        />
        <p>{alarm.content}</p>
      </div>
    </div>
  );
};

export default AlarmItem;