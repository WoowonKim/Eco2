import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import styles from "./ChattingItem.module.css";
import { getUserName } from "../../../store/user/common";

import { deleteRoom } from "../../../store/chat/chattingSlice";

const ChattingItem = ({
  key,
  id,
  toUser,
  fromUser,
  lastSendTime,
  lastSendMessage,
  setDeleteFlag
}) => {
  const [toUserName, setToUserName] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const name = getUserName();
    if (name === toUser) {
      setToUserName(fromUser);
    } else {
      setToUserName(toUser);
    }
  }, []);

  const deleteChattingRoom = () => {
    if (window.confirm("채팅방을 삭제하시겠습니까?")) {
      dispatch(deleteRoom({ roodId: id })).then((res) => {
        if (res.payload.status === 200) {
          // window.location.reload(`/chatting/${loginId}`);
          setDeleteFlag((curr) => curr + 1);
        }
      });
    }
  }
  const room = () => {
    window.location.reload(`/chatting/room`);
  }
  return (
    <button className={styles.list} onClick={room}> 
      <Link to={`/chatting/room`} state={{ roomId: id }} className={styles.link}>
        <div className={styles.leftContent}>
          <img
            src={`http://localhost:8002/img/profile/${id}`}
            alt="profileImg"
            className={styles.profileImg}
          />
          <div className={`${styles.toUserName}`}>{toUserName}</div>
          <div className={`${styles.lastSendMessage}`}>
            {lastSendMessage !== null ? (
              lastSendMessage.length < 20
                ? lastSendMessage
                : lastSendMessage.slice(0, 20) + '...'
            ) : (
              <div></div>
            )}

          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={`${styles.lastSendTime}`}>{lastSendTime}</div>
        </div>
      </Link>
      <div className={styles.dropdown}>
        <i className={`fa-solid fa-ellipsis-vertical ${styles.icon}`}></i>
        <div className={styles.dropdownContent}>
          <div>
            <button
              onClick={deleteChattingRoom}
              className={styles.dropdownItem}
            >
              나가기
              <i
                className={`fa-solid fa-trash-can ${styles.dropdownIcon}`}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </button>

  );
};

export default ChattingItem;
