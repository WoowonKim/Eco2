import React, { useState, useEffect } from "react";
import AlarmList from "../../components/alarm/alarmList/AlarmList";
import styles from "./alarm.module.css";
import { getUserId } from "../../store/user/common";
import { useDispatch } from "react-redux";
import { getAlarms } from "../../store/alarm/alarmSlice";
import { firestore, dbService } from "../../store/firebase";

const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const dispatch = useDispatch();

  console.log("Alarm");

  // useEffect(() => {
  //   dispatch(getAlarms({ userId: 9 })).then((res) => {
  //     setAlarms(res.payload);
  //   });
  // }, []);
  useEffect(() => {
    firestore.onSnapshot(
      // firestore.collection(dbService, `alarm/1/common`),
      firestore.collection(dbService, `alarm/${getUserId()}/common`),
      (snapshot) => {
        const alarmArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(alarmArray);
        setAlarms(alarmArray);
      }
    );
    // firestore.onSnapshot(
    //   firestore.collection(dbService, `alarm/1/friendRequest`),
    //   // firestore.collection(dbService, `alarm/${getUserId()}/common`),
    //   (snapshot) => {
    //     const alarmArray = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     console.log(alarmArray);
    //     setFriendRequests(alarmArray);
    //   }
    // );
  }, []);

  return (
    <div className={styles.container}>
      {/* <div className={styles.list}>
        <AlarmList alarms={friendRequests} />
      </div> */}
      <div className={styles.list}>
        <AlarmList alarms={alarms} />
      </div>
    </div>
  );
};

export default Alarm;
