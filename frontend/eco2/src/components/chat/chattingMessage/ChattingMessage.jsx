import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ChattingMessage.module.css";
import ChattingMessageItem from "../chattingMessageItem/ChattingMessageItem";

const ChattingMessage = ({ chattingMessages }) => {
  return (
    <div>
      {chattingMessages &&
        chattingMessages.map((chattingMessage) => (
          <ChattingMessageItem
            key={chattingMessage.id}
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
