import React from "react";
import styles from "./ChatModal.module.css";
import { Link } from "react-router-dom";
import ChatModalItem from "./ChatModalItem";


const ChatModalList = ({ friends }) => {

  return (
    <div>
      {friends &&
        friends.map((friend) => (
          <ChatModalItem
            key={friend.id}
            id={friend.id}
            email={friend.email}
            name={friend.name}
          />
        ))}
    </div>
  );
};

export default ChatModalList;
