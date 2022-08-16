import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChattingRoom.module.css";
import { useNavigate } from "react-router-dom";
import ChattingMessage from "../../../components/chat/chattingMessage/ChattingMessage";
import { chattingMessageList } from "../../../store/chat/chattingSlice";
import {
  getUserName,
  getUserId,
} from "../../../store/user/common";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { getStompClient } from "../../../store/socket";
import { Link } from "react-router-dom";

const ChattingRoom = () => {
  const roomId = useLocation().state.roomId;
  const [chattingMessages, setChattingMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(getUserId());
  const [users, setUserList] = useState([]);
  const [toUser, setToUser] = useState({});
  const stompClient = getStompClient();
  const dispatch = useDispatch();
  const scrollRef = useRef();
  let navigate = useNavigate();
  const [checkImg, setCheckImg] = useState(0);

  useEffect(() => {
    // users.map((user) => (
    //   user.id != userId && 
    // ));
    if (stompClient === null) {
      return;
    }
    connect();
  }, []);

  useEffect(() => {
    dispatch(chattingMessageList({ roomId: roomId })).then((res) => {
      if (res.payload.status === 200) {
        setChattingMessages(res.payload.chatMessageList);
        setUserList(res.payload.userList);
      }
    });
  }, []);
  const connect = () => {
    stompClient.connect({}, () => {
      stompClient.subscribe('/sub/chat/room/' + roomId, (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      })
    }, (error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chattingMessages]);

  const addMessage = (message) => {
    setChattingMessages((prev) => [...prev, message]);
  };
  const sendMessage = () => {
    if (message != "") {
      stompClient.send(
        "/pub/message",
        {},
        JSON.stringify({
          message: message,
          user: { id: userId },
          chatRoom: { id: roomId },
        })
      );
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    setMessage("");
  };
  const onKeyPress = (e) => {
    if(e.key=='Enter'){
      sendMessage();
    }
  };
  const backPage = () => {
    navigate("/chatting");
  };
  return (
    <div className={styles.chattingRoom} ref={scrollRef}>
      <div className={styles.header}>
      <i className={`fa-solid fa-angles-left ${styles.backIcon}`} onClick={backPage}></i>
        {
          users.map((user) => (
            user.id != userId &&
            // <Link to={`/profile/${commentUserId}`} className={styles.link}>
            //   <div>
            //     <img
            //       src={`http://localhost:8002/img/profile/${user.id}`}
            //       alt="profile"
            //       className={styles.profileImg}
            //     />
            //     <div className={styles.toUserName}>{user.name}</div>
            //   </div>
            // </Link>
        <button
        className={styles.profileButton}
        onClick={() => {
          // navigate(`/profile/${commentUserId}`, {
          //   state: { userEmail },
          // })
         }}
      >
        {/* <img
          src={`${process.env.REACT_APP_BE_HOST}img/profile/${commentUserId}`}
          alt="profileImg"
          className={styles.profileImg}
        />
        <div className={styles.toUserName}>{user.name}</div> */}
      </button>

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
      <div>
        <br />
        <br />
        <br />
      </div>
      <div className={styles.chattingForm}>
        <div className={styles.sendMessage}>
          <input
            id="sendMessage"
            type="text"
            value={message}
            placeholder="메시지를 입력하세요"
            onChange={(e) => setMessage(e.target.value)}
            className={styles.messageInput}
            onKeyPress={onKeyPress}
          />
        </div>
        <button onClick={sendMessage} className={styles.sendButton}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChattingRoom;