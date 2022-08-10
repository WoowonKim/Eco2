import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./ChattingRoom.module.css";
import ChattingMessage from "../../../components/chat/chattingMessage/ChattingMessage";
import { chattingMessageList } from "../../../store/chat/chattingSlice";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getUserName, getUserId } from "../../../store/user/common";
import React, { useRef } from "react";


let sockJS = new SockJS("http://localhost:8002/chat");
let stompClient = Stomp.over(sockJS);
stompClient.debug = () => {};

const ChattingRoom = () => {

  const [chattingMessages, setChattingMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUserList] = useState([]);
  const params = useParams();

  const dispatch = useDispatch();
  const scrollRef = useRef();
  
  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe('/sub/chat/room/' + params.roomId, (data) => {
        const newMessage = JSON.parse(data.body);
          addMessage(newMessage);
      });
    })
    setUserId(getUserId()); 
    setName(getUserName());
    dispatch(chattingMessageList({ roomId: params.roomId })).then((res) => {
      if (res.payload.status === 200) {
        setChattingMessages(res.payload.chatMessageList);
        setUserList(res.payload.userList);
      }
    });

  }, []);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chattingMessages]);

  const addMessage = (message) => {
    setChattingMessages(prev => [...prev, message]);
  };
  

  const sendMessage = () => {
    if (message != "") {
      stompClient.send("/pub/message", {}, JSON.stringify({ message: message, user: { id: userId }, chatRoom: { id: params.roomId } }));
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    setMessage("");
  }
  return (
    <div className={styles.chattingRoom} ref={scrollRef}>
      <div className={styles.header}>
        {
          users.map((user) => (
            user.id != userId &&
            <div>
              <img
                src={`http://localhost:8002/img/profile/${user.id}`}
                alt="profileImg"
                className={styles.profileImg}
              />
              <div className={styles.toUserName}>{user.name}</div>
            </div>
          ))
        }

      </div>
      <div className={styles.chatting}>
        <ChattingMessage chattingMessages={chattingMessages} />
      </div>
      <div><br /><br /><br /></div>
      <div className={styles.chattingForm}>
        <div className={styles.sendMessage}>
          <input
            id="sendMessage"
            type="text"
            value={message}
            placeholder="메시지를 입력하세요"
            onChange={(e) => setMessage(e.target.value)}
            className={styles.messageInput}
          />
        </div>
          <button
            onClick={sendMessage}
            className={styles.sendButton}
          >
            전송
          </button>
      </div>
    </div>
  );
};

export default ChattingRoom;