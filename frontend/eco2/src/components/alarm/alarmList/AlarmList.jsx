import React from "react";
import styles from "./alarmList.module.css";
import AlarmItem from "../alarmItem/AlarmItem";

const AlarmList = ({ alarms, isFriendRequest }) => {
  console.log("alarmlist", alarms);
  return (
    <div className={styles.container}>
      <div>
        {!!alarms ? (
          alarms.map((alarm) => (
            <AlarmItem
              key={alarm.id}
              alarm={alarm}
              isFriendRequest={isFriendRequest}
            />
          ))
        ) : isFriendRequest ? (
          <></>
        ) : (
          <div>알림이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default AlarmList;
