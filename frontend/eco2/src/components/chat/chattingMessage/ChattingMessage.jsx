import { useEffect, useState } from "react";
import styles from "./ChattingMessage.module.css";
import ChattingMessageItem from "../chattingMessageItem/ChattingMessageItem";

const ChattingMessage = ({ chattingMessages }) => {
  return (
    <div>
      {chattingMessages &&
        chattingMessages.map((chattingMessage, i) => (
          <ChattingMessageItem
            key={i}
            id={chattingMessage.id}
            message={chattingMessage.message}
            user={chattingMessage.user.name}
            sendDate={chattingMessage.sendDate}
          />
        ))}
    </div>
  );
};
export default ChattingMessage;
