import { useEffect, useState } from "react";
import { createRoutesFromChildren, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import ChattingList from "../../../components/chat/chattingList/ChattingList";
import { chattingList } from "../../../store/chat/chattingSlice";
import styles from "./Chatting.module.css";
import ChatModal from "../../../components/modal/chatModal/ChatModal";
import { getUserId } from "../../../store/user/common";
import ChattingItem from "../../../components/chat/chattingItem/ChattingItem";

const Chatting = () => {
  const chattings = useSelector((state) => state.chatting.data);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteFlag, setDeleteFlag] = useState(0);
  const userId = getUserId();

  useEffect(() => {
    dispatch(chattingList({ userId: userId }));
  }, [deleteFlag]);

  return (
    <div className={styles.chatting}>
      {chattings.length === 0 ? (
        <div className={styles.noChattingList}>
          <span className={styles.noChattingMessage}>채팅 목록이 없습니다.</span>
        </div>
      ) : (
        chattings.map((chatting, i) => {
          return (
            <ChattingItem
              key={chatting.id}
              id={chatting.id}
              toUser={chatting.toUser}
              fromUser={chatting.fromUser}
              lastSendTime={chatting.lastSendTime}
              lastSendMessage={chatting.lastSendMessage}
              setDeleteFlag={setDeleteFlag}
            />
          );
        })
      )}
      <i
        onClick={() => {
          setVisible(!visible);
          setModalType("친구목록");
        }}
        className={`${"fa-solid fa-circle-plus"} ${styles.createRoomButton}`}></i>

      {visible && modalType === "친구목록" && (
        <ChatModal
          title={"친구 목록"}
          type={"친구목록"}
          userId={userId}
          closeModal={() => setVisible(!visible)}
        />
      )}
    </div>
  );
};

export default Chatting;
