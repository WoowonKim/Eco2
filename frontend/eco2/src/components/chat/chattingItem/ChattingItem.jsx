import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ChattingItem.module.css";
import { getUserName } from "../../../store/user/common";
import ChatModal from "../../../components/modal/chatModal/ChatModal";

const ChattingItem = ({
  id,
  toUser,
  fromUser,
  lastSendTime,
  lastSendMessage,
  setDeleteFlag,
}) => {
  const [toUserName, setToUserName] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
 const displayType = modalType ? styles.visible : styles.hidden;
  const navigate = useNavigate();

  useEffect(() => {
    const name = getUserName();
    if (name === toUser) {
      setToUserName(fromUser);
    } else {
      setToUserName(toUser);
    }
  }, []);

  const room = () => {
    navigate(`/chatting/room`, { state: { roomId: id, userName: toUserName } });
    window.location.reload(`/chatting/room`);
    };
  return (
      <div className={styles.list}>
        {/* <Link to={`/chatting/room`} state={{ roomId: id, userName: toUserName }} className={styles.link}> */}
          <div onClick={room} className={styles.link}>
          <div className={styles.leftContent}>
            <img
              src={`http://localhost:8002/img/profile/${id}`}
              alt="profileImg"
              className={styles.profileImg}
            />
            <div className={`${styles.toUserName}`}>{toUserName}</div>
            <div className={`${styles.lastSendMessage}`}>
              {lastSendMessage !== null ? (
                lastSendMessage.length < 15
                  ? lastSendMessage
                  : lastSendMessage.slice(0, 15) + '...'
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={`${styles.lastSendTime}`}>{lastSendTime}</div>
          </div>
        {/* </Link> */}
        </div>
        <div className={styles.deleteButton}>
          <i className={`fa-solid fa-minus ${styles.icon}`}   
          onClick={()=>{
                  setVisible(!visible);
                  setModalType("나가기");
                }}></i>
        </div>

      {visible && modalType === "나가기" && (
            <ChatModal
              title={"채팅방 삭제"}
              content={"채팅방을 삭제하시겠습니까?"}
              type={"나가기"}
              className={`${displayType}`}
              roomId={id}
              setDeleteFlag={setDeleteFlag}
              closeModal={() => setVisible(!visible)}
            />
          )}
    </div>
  );
};

export default ChattingItem;
