import React from "react";
import { useEffect, useState } from "react";
import styles from "./ChatModal.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../../store/chat/chattingSlice";
import { getUserId } from "../../../store/user/common";

const ChattModalItem = ({
  key,
  id,
  email,
  name,
}) => {
    const [userId, setUserId] = useState("");
    const dispatch = useDispatch();

  useEffect(() => {
    setUserId(getUserId());
  }, []);
  return (
      <div className={styles.list}>
        <div className={styles.leftContent}>
        {/* <span className={`${styles.text}`}>{id}</span> */}
          {/* <span className={`${styles.text}`}>{email}</span> */}
          <span className={`${styles.text}`}>{name}</span>
        </div>
        <div className={styles.rightContent}>
        <button
            onClick={() => {
              dispatch(createRoom({ userId, id })).then((res) => {
                if (res.payload?.status === 200) {
                  //새로고침인가?
                  window.location.replace(`/chatting/room/${res.payload.roomId}`);
                }
              });
            }}
            className={`${styles.cancleButton}`}
          >
            채팅
          </button>
        </div>

      </div>
  );
};

export default ChattModalItem;