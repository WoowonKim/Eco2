import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChattingRoom.module.css";
import ChattingMessage from "../../../components/chat/chattingMessage/ChattingMessage";
import { chattingMessageList } from "../../../store/chat/chattingSlice";
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
import { getUserName, getUserId } from "../../../store/user/common";
import React, { useRef } from "react";
import { useLocation } from 'react-router-dom';
import { getStompClient } from "../../../store/socket";

// let url = process.env.REACT_APP_BE_HOST + "socket";
// let sockJS = new SockJS(url);
// let stompClient = Stomp.over(sockJS);

const ChattingRoom = () => {
  const roomId = useLocation().state.roomId;
  const [chattingMessages, setChattingMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUserList] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  // let stompClient = getStompClient();
  // stompClient.debug = () => { };

  const dispatch = useDispatch();
  const scrollRef = useRef();
  let accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLjhYzjhYwiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTY2MDE0MTE2MCwiZXhwIjoxNjYwMjYxMTYwfQ.Y0IZGYTOCu4y0-CKzWSzwvosdKp2LRlY26kFU9dDUnU";
  // window.location.reload();

  //어세스 토큰 가져오기
  useEffect(() => {
    
    let client = getStompClient();
    console.log(client);
    console.log(client.connected);
    // client.connect({ "Auth-accessToken": accessToken }, (frame) => {
    //   console.log("dfdfd");
    // });
    setStompClient(client);
  }, []);


  useEffect(() => {
    if(stompClient === null){
      console.log(stompClient);
      console.log("stompClient");
      return;
    }
    stompClient.connect({ "Auth-accessToken": accessToken }, (frame) => {
      console.log("소켓 연결");
      stompClient.subscribe('/sub/chat/room/' + roomId, (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
        console.log(newMessage.message);
      })
    }, (error) => {
      //발급된 어세스 다시 받아와서 재요청-> 쿠키가 필요함,, (client 재접속)
      //발급된 어세스가 없으면 (리프레시 만료시) 재로그인으로 요청
      console.log(error);
    });

    dispatch(chattingMessageList({ roomId: roomId })).then((res) => {
      if (res.payload.status === 200) {
        setChattingMessages(res.payload.chatMessageList);
        setUserList(res.payload.userList);
      }
    });
    setUserId(getUserId());
    setName(getUserName());

  }, [stompClient]);

  // useEffect(() => {
  //   // scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  // }, [chattingMessages]);

  const addMessage = (message) => {
    setChattingMessages(prev => [...prev, message]);
  };
  const sendMessage = () => {
    if (message != "") {
      stompClient.send("/pub/message", {}, JSON.stringify({ message: message, user: { id: userId }, chatRoom: { id: roomId } }));
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

      {chattingMessages.length > 0 ? (
        <div className={styles.chatting}>
          <ChattingMessage chattingMessages={chattingMessages} />
        </div>
      ) : (
        <div className={styles.noChattingList}>
          <span className={styles.noChattingMessage}>대화를 시작해보세요!</span>
        </div>
      )}
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