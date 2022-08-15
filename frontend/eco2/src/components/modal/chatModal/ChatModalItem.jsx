import React from "react";
import { useEffect, useState } from "react";
import styles from "./ChatModal.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../../store/chat/chattingSlice";
import { getUserId } from "../../../store/user/common";

const ChattModalItem = ({ key, id, email, name }) => {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setUserId(getUserId());
  }, []);
  return (
    <div className={styles.list}>
      <div className={styles.leftContent}>
        <img
          src={`http://localhost:8002/img/profile/${id}`}
          alt="profileImg"
          className={styles.profileImg}
        />
        <div className={`${styles.text}`}>{name}</div>
      </div>
      <div className={styles.rightContent}>
        <div
          onClick={() => {
            dispatch(createRoom({ userId, id })).then((res) => {
              if (res.payload?.status === 200) {
                navigate(`/chatting/room`, { state: { roomId: res.payload.roomId, userId: id } });
                window.location.reload(`/chatting/room`);
              }
            });
          }}
          className={`${styles.createButton}`}
        >
          {" "}
          채팅
        </div>
      </div>
    </div>
  );
};

export default ChattModalItem;
