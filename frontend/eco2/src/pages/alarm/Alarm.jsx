import React, { useState, useEffect } from "react";
import AlarmList from "../../components/alarm/alarmList/AlarmList";
import styles from "./alarm.module.css";
import { useSelector } from "react-redux";
import {
  selectCommonAlarms,
  selectFriendRequestAlarms,
} from "../../store/alarm/alarmSlice";

const Alarm = () => {
  const alarms = useSelector(selectCommonAlarms);
  const friendRequests = useSelector(selectFriendRequestAlarms);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <AlarmList alarms={friendRequests} isFriendRequest={true} />
      </div>
      <div className={styles.list}>
        <AlarmList alarms={alarms} isFriendRequest={false} />
      </div>
    </div>
  );
};

export default Alarm;
