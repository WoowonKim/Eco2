import { useEffect, useState } from "react";
import { createRoutesFromChildren, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChattingList from "../../../components/chat/chattingList/ChattingList";
import { chattingList } from "../../../store/chat/chattingSlice";
import styles from "./Chatting.module.css";
import ChatModal from "../../../components/modal/chatModal/ChatModal";

const Chatting = () => {

  const [chattings, setChattings] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteFlag, setDeleteFlag] = useState(0);

  useEffect(() => {
    dispatch(chattingList({ userId: params.userId })).then((res) => {
      if (res.payload.status === 200) {
        setChattings(res.payload.chatRoomList);
      }
    });
  }, [deleteFlag]);

  return (
    <div className={styles.chatting}>
      <ChattingList chattings={chattings}
      setDeleteFlag = {setDeleteFlag}
       />
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
          userId={ params.userId}
          closeModal={() => setVisible(!visible)}
        />
      )}
    </div>
  );
};

export default Chatting;
