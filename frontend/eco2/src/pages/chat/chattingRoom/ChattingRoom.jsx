import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChattingRoom.module.css";
import ChattingMessage from "../../../components/chat/chattingMessage/ChattingMessage";
import { chattingMessageList } from "../../../store/chat/chattingSlice";
import { getUserName, getUserId } from "../../../store/user/common";
import React, { useRef } from "react";
import { useLocation } from 'react-router-dom';
import { getStompClient } from "../../../store/socket";
import { connect } from "net";
import { Link } from "react-router-dom";

const ChattingRoom = () => {
  const roomId = useLocation().state.roomId;
  const [chattingMessages, setChattingMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUserList] = useState([]);
  const stompClient = getStompClient();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  // let socket = new WebSocket("http://localhost:8002/socket");
  let accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLjhYzjhYwiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjYwMjg0MDc3LCJleHAiOjE2NjA0MDQwNzd9.EUFNJtEarPVmWgypKr0qFfGq0RYtTPez8y2k7u1myfE";
  //"Auth-accessToken": accessToken
  //어세스 토큰 가져오기
  //발급된 어세스 다시 받아와서 재요청-> 쿠키가 필요함,, (client 재접속)
  //발급된 어세스가 없으면 (리프레시 만료시) 재로그인으로 요청
  useEffect(() => {
    if (stompClient === null) {
      console.log("널입니다");
      return;
    }
    console.log(stompClient);

    connect();
    // connect();
    // socket.onclose = function(){
    //   console.log("재접속ㄴ");
    //   setTimeout(function(){connect();}, 1000);
    //  };
    //  socket.onopen = function(event) {
    //   console.log("WebSocket is open now.");
    // };

  }, [stompClient.connected]);

  useEffect(() => {
    dispatch(chattingMessageList({ roomId: roomId })).then((res) => {
      if (res.payload.status === 200) {
        setChattingMessages(res.payload.chatMessageList);
        setUserList(res.payload.userList);
      }
    });
    setUserId(getUserId());
    setName(getUserName());
  }, []);
  const connect = () => {
    console.log("연결");
    stompClient.connect({}, () => {
      console.log("소켓 연결");
      stompClient.subscribe('/sub/chat/room/' + roomId, (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
        console.log(newMessage.message);
      })
      console.log(stompClient);
    }, (error) => {
      console.log(error);
    });
    console.log(stompClient.connected);
  }

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chattingMessages]);

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
            <Link to={`/profile/${user.id}`} className={styles.link}>
              <div>
                <img
                  src={`http://localhost:8002/img/profile/${user.id}`}
                  alt="profileImg"
                  className={styles.profileImg}
                />
                <div className={styles.toUserName}>{user.name}</div>
              </div>
            </Link>
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