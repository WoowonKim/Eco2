import { useEffect, useState } from "react";
import React from "react";
import ChattingItem from "../chattingItem/ChattingItem";
import styles from "./ChattingList.module.css";
import { getUserName } from "../../../store/user/common";

const ChattingList = ({ chattings }) => {

  const [name, setName] = useState("");
  useEffect(() => {
    setName(getUserName());
  }, []);

  return (
    <div>
      {chattings &&
        chattings.map((chatting) => (
          <ChattingItem
            key={chatting.id}
            id={chatting.id}
            toUser={chatting.toUser}
            fromUser={chatting.fromUser}
            lastSendTime={chatting.lastSendTime}
          />
        ))}
    </div>
  );
};

export default ChattingList;