import { useEffect, useState } from "react";
import React from "react";
import ChattingItem from "../chattingItem/ChattingItem";
import styles from "./ChattingList.module.css";
import { getUserName } from "../../../store/user/common";

const ChattingList = ({ chattings }) => {

  const [name, setName] = useState("");
  const [toUserName, setToUserName] = useState("");

  useEffect(() => {
    setName(getUserName());
  }, []);

  return (
    <div>
      {chattings &&
        chattings.map((chatting) => (
          // if(chatting.toUser === name){
          //   setToUserName(chatting.fromUser);
          // }else{
          //   setToUserName(chatting.toUser);
          // }
          <ChattingItem
            key={chatting.id}
            id={chatting.id}
            toUser={chatting.fromUser}
            lastSendTime={chatting.lastSendTime}
            lastSendMessage={chatting.lastSendMessage}
          />
        ))}
    </div>
  );
};

export default ChattingList;