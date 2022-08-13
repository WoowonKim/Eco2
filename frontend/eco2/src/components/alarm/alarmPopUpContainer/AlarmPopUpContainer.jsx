import React, { useEffect } from "react";
import styles from "./alarmPopUpContainer.module.css";
import { firestore, dbService } from "../../../store/firebase";
import { getUserId } from "../../../store/user/common";
import { setAlarms } from "../../../store/alarm/alarmSlice";
import { useDispatch } from "react-redux";
import { limit, orderBy } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlarmPopUpContainer = () => {
  const dispatch = useDispatch();

  // 파이어베이스 onSnapShot 생성
  const getFirestoreAlarm = (type) => {
    const q = firestore.query(
      firestore.collection(dbService, `alarm/${getUserId()}/${type}`),
      orderBy("sendTime", "desc"),
      limit(50)
    );

    return firestore.onSnapshot(q, async (snapshot) => {
      let now = new Date();

      let recentLookup = 0;
      try {
        // 최근 조회 시간 받아오기
        const docSnap = await firestore.getDoc(
          firestore.doc(dbService, `alarm/${getUserId()}`)
        );

        recentLookup = docSnap.data()[type + "RecentLookup"];

        const t = new Date(0);
        t.setUTCSeconds(recentLookup);
      } catch (err) {
        console.log(err);
      }
      if (!recentLookup) {
        recentLookup = 0;
      }

      let isNew = false;
      // 최근 조회 시간 이후의 알림에 대해 알림 띄우기
      snapshot.docChanges().forEach((change) => {
        const alarm = change.doc.data();

        const tt = new Date(0);
        tt.setUTCSeconds(alarm.sendTime);
        if (change.type === "added" && alarm.sendTime > recentLookup) {
          isNew = true;
          // console.log("new alarm:", alarm);
          toast(alarm.content, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });

      // redux에 저장
      const alarmArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setAlarms({ name: type, data: alarmArray }));

      if (isNew) {
        // 최근 조회 시간 업데이트
        const docRef = firestore.doc(dbService, "alarm", getUserId());
        const data = {};
        data[type + "RecentLookup"] =
          (now.valueOf() + now.getTimezoneOffset()) / 1000;

        try {
          await firestore.setDoc(docRef, data, { merge: true });
        } catch (err) {
          console.log("err", err);
        }
      }
    });
  };

  // 친구 신청 알림 onSnapShot
  useEffect(() => {
    const unsubscribe = getFirestoreAlarm("friendRequest");
    return () => unsubscribe();
  }, []);

  // 일반 알림 onSnapShot
  useEffect(() => {
    const unsubscribe = getFirestoreAlarm("common");
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AlarmPopUpContainer;
