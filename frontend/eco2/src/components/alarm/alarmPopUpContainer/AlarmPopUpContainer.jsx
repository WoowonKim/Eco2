import React, { useEffect } from "react";
import styles from "./alarmPopUpContainer.module.css";
import { firestore, dbService } from "../../../store/firebase";
import { getUserId } from "../../../store/user/common";
import { setAlarms } from "../../../store/alarm/alarmSlice";
import { useDispatch } from "react-redux";
import { limit, orderBy } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const AlarmPopUpContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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
      const loc = window.location;
      const deleteArray = [];
      // redux에 저장
      const alarmArray = snapshot.docs
        .filter((doc) => {
          const alarm = doc.data();
          // console.log("alarm", alarm);
          // console.log("location.state", location.state);
          if (
            loc.pathname === "/chatting/room" &&
            alarm.dtype === "newChat" &&
            (alarm.senderName === location.state.userName ||
              alarm.senderId === location.state.userId)
          ) {
            // await firestore.deleteDoc(firestore.doc(dbService, `alarm/${doc.data().}`))
            deleteArray.push(alarm.id);
            return false;
          } else if (
            loc.pathname !== "/alarm" &&
            alarm.sendTime > recentLookup
          ) {
            toast("🔔 " + alarm.content, {
              position: "bottom-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          return true;
        })
        .map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
      dispatch(setAlarms({ name: type, data: alarmArray }));

      deleteArray.forEach(async (id) => {
        await firestore.deleteDoc(
          firestore.doc(dbService, `alarm/${getUserId()}/common`, id)
        );
      });

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
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        onClick={() => {
          navigate("/alarm");
        }}
        toastClassName={styles["toastify-toast"]}
      />
    </div>
  );
};

export default AlarmPopUpContainer;
