import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postDelete } from "../../../store/post/postSlice";
import styles from "./ChatModal.module.css";
import { chattingFriendList } from "../../../store/chat/chattingSlice";
import ChatModalList from "./ChatModalList";

const ChatModal = ({
  title,
  type,
  userId,
  closeModal,
}) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const colorType = type === "수정" ? styles.editButton : styles.warningButton;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    dispatch(chattingFriendList({ userId })).then((res) => {
      if (res.payload.status === 200) {
        setFriends(res.payload.friendList);
      }
    });
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);


  return (
    <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
        <div className={styles.modalTitle}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        
        <ChatModalList friends={friends} />

        <div className={styles.buttonGroup}>
          <button
            onClick={() => {
              setHidden(true);
              document.body.style = `overflow: auto`;
            }}
            className={`${styles.cancleButton}`}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
