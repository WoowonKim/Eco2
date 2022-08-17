import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ChatModal.module.css";
import { chattingFriendList, deleteRoom } from "../../../store/chat/chattingSlice";
import ChatModalList from "./ChatModalList";

const ChatModal = ({ title, content, type, userId, closeModal, roomId, setDeleteFlag }) => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (userId != null) {
      dispatch(chattingFriendList({ userId })).then((res) => {
        if (res.payload.status === 200) {
          setFriends(res.payload.friendList);
        }
      });
      document.body.style = `overflow: hidden`;
      return () => (document.body.style = `overflow: auto`);
    }
  }, []);

  return (
    <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
        <div className={styles.modalTitle}>
          {type === "나가기" ? (
            <i className={`fa-solid fa-circle-exclamation ${styles.deleteIcon}`}></i>
          ) : (
            <i className={`fa-solid fa-circle-check ${styles.deleteIcon}`}></i>
          )}
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.body}>
          {type === "나가기" ? (
            <p className={styles.content}>{content}</p>
          ) : (
            <div className={styles.friends}>
              {friends.length > 0 ? (
                <ChatModalList friends={friends} />
              ) : (
                <div className={styles.noFriendList}>
                  <span className={styles.noFriendMessage}>친구 목록이 없습니다.</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.buttonGroup}>
          {type === "나가기" ? (
            <div>
              <button
                onClick={() => {
                  dispatch(deleteRoom({ roodId: roomId })).then((res) => {
                    if (res.payload.status === 200) {
                      setDeleteFlag((curr) => curr + 1);
                    }
                  });
                  setHidden(true);
                }}
                className={`${styles.editButton}`}
              >
                삭제
              </button>
              <button
                onClick={() => {
                  setHidden(true);
                  document.body.style = `overflow: auto`;
                }}
                className={`${styles.cancleButton}`}
              >
                취소
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setHidden(true);
                document.body.style = `overflow: auto`;
              }}
              className={`${styles.cancleButton}`}
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
