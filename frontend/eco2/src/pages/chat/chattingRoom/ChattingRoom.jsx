import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./ChattingRoom.module.css";
import ChattingMessage from "../../../components/chat/chattingMessage/ChattingMessage";
import { chattingMessageList } from "../../../store/chat/chattingSlice";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getUserName } from "../../../store/user/common";
import { getUserId } from "../../../store/user/common";


let sockJS = new SockJS("http://localhost:8002/chat");
let stompClient = Stomp.over(sockJS);
stompClient.debug = () => { };

const ChattingRoom = () => {

  const [chattingMessages, setChattingMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    setUserId(getUserId());
    setName(getUserName());
    console.log(name, userId);
    dispatch(chattingMessageList({ roomId: params.roomId })).then((res) => {
      if (res.payload.status === 200) {
        setChattingMessages(res.payload.chatMessageList);
      }
    });
    stompClient.connect({}, () => {})
  }, []);
  const addMessage = (message) =>{
    setChattingMessages(prev=>[...prev, message]);
  };

  const sendMessage = () => {
      console.log(message);
      stompClient.send("/pub/message", {}, JSON.stringify({message: message, user: {id: userId}, chatRoom: {id: params.roomId}}));
      setMessage("");
      stompClient.subscribe('/sub/chat/room/'+params.roomId, (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
      console.log(chattingMessages);
    
  }
  return (
    <div className={styles.chattingRoom}>
      <div className={styles.header}>
        {/* {/* //상대방 사용자 이름 , 프로필 사진 */}
      </div>
      <div className={styles.chatting}>
        {/* 채팅 리스트만큼 채팅 보여주기 */}
        <div className={styles.profileImg}>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="earth"
            className={styles.img}
          />
        </div>
        <ChattingMessage chattingMessages={chattingMessages} />
      </div>
      <div className={styles.chattingForm}>
        {/* 채팅 메시지 보내는 박스 */}
        <div className={styles.sendMessage}>
          {/* 채팅 메시지 입력 박스 */}
          <input
            id="sendMessage"
            type={message}
            placeholder="메시지를 입력하세요"
            onChange={(e) => setMessage(e.target.value)}
            className={styles.passwordFormInput}
          />
        </div>
        <div className={styles.sendBox}>
          {/* 채팅 메시지 입력 박스 */}
          <button
            onClick={sendMessage}
            className={styles.userButton}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingRoom;