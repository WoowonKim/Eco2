import React, { useState, useEffect } from "react";
import styles from "./alarmItem.module.css";
import { useDispatch } from "react-redux";
import { deleteAlarm, responseFriendRequest } from "../../../store/alarm/alarmSlice";
import { getUserId } from "../../../store/user/common";
import { useNavigate } from "react-router-dom";
import FriendRequestModal from "../../modal/friendResponseModal/FriendRequestModal";

const AlarmItem = ({ alarm, isFriendRequest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [acceptArgs, setAcceptArgs] = useState({});
  const [msg, setMsg] = useState("");

  const getTime = (time) => {
    const now = new Date();
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(time);

    if (now.valueOf() - dateTime.valueOf() < 86400000 && now.getDate() === dateTime.getDate()) {
      return addZero(dateTime.getHours()) + ":" + addZero(dateTime.getMinutes());
    } else {
      return dateTime.toLocaleDateString();
    }
  };

  const addZero = (num) => {
    if (num < 10) return "0" + num;
    else return num;
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
      case "friendRequest":
        return "친구 신청";
      case "newChat":
        return "채팅";
      case "questAchieve":
        return "퀘스트 완료";
      default:
        return "알림";
    }
  };

  const getImage = (alarm) => {
    switch (alarm.dtype) {
      case "friendAccept":
      case "comment":
      case "friendRequest":
      case "newChat":
        return `${process.env.REACT_APP_BE_HOST}img/profile/${alarm.senderId}`;
      case "report":
      default:
        return process.env.PUBLIC_URL + `/logo.png`;
    }
  };

  const onClickDelete = (id, userId) => {
    setIsDelete(true);
    setTimeout(() => dispatch(deleteAlarm({ id: id, userId: userId })), 300);
  };

  const onClickFriendResponse = (friendId, response) => {
    setMsg(`정말 ${response ? "수락" : "거절"}하시겠습니까?`);
    setAcceptArgs({ friendId, response });
    setVisible(true);
  };

  const onClickNavigate = (id, type, senderId) => {
    // TODO: 알림을 눌러서 이동했을 시 알림을 삭제할 것인지?
    if (type !== "friendRequest") {
      dispatch(deleteAlarm({ id: id, userId: getUserId() }));
    }
    if (type !== "newChat") {
      navigate(alarm.url);
    } else {
      // 채팅 이동
      const url = alarm.url.split("?");
      const uri = url[0];
      const roomId = Number(url[1].split("=")[1]);
      navigate(uri, { state: { roomId: roomId, userId: senderId } });
      window.location.reload(`/chatting/room`);
    }
  };

  return (
    <>
      <div className={`${styles.container} ${isDelete && styles["container-delete"]}`}>
        <div className={styles.head}>
          <div className={styles.title}>
            <i className={"fa-solid fa-circle-dot icon"}></i>
            <p>
              <b>{getType(alarm.dtype)}</b>
            </p>
            <p>{getTime(alarm.sendTime)}</p>
          </div>
          <div className={styles.close}>
            {alarm.dtype === "friendRequest" || (
              <i
                className={`fa-solid fa-x icon`}
                onClick={() => {
                  onClickDelete(alarm.id, alarm.userId);
                }}
              ></i>
            )}
          </div>
        </div>
        <div
          className={styles.content}
          onClick={() => {
            onClickNavigate(alarm.id, alarm.dtype, alarm.senderId);
          }}
        >
          <img className={styles.profileImg} src={getImage(alarm)} alt="profileImg" />
          <p>{alarm.content}</p>
        </div>
        <>
          <div className={styles.buttons}>
            {isFriendRequest && (
              <>
                <button
                  className={`${styles.button} ${styles.accept}`}
                  onClick={() => {
                    onClickFriendResponse(alarm.senderId, true);
                  }}
                  type="button"
                >
                  수락
                </button>
                <button
                  className={`${styles.button} ${styles.refuse}`}
                  onClick={() => {
                    onClickFriendResponse(alarm.senderId, false);
                  }}
                  type="button"
                >
                  거절
                </button>
              </>
            )}
          </div>
        </>
      </div>
      {visible && alarm.dtype === "friendRequest" && (
        <FriendRequestModal
          title={"친구 요청"}
          content={msg}
          accept={({ friendId, response }) => {
            setIsDelete(true);
            setTimeout(() =>
              dispatch(
                responseFriendRequest({
                  id: parseInt(getUserId()),
                  friendId: friendId,
                  response: response,
                })
              )
            );
          }}
          acceptArgs={acceptArgs}
          closeModal={() => setVisible(false)}
        />
      )}
    </>
  );
};

export default AlarmItem;
