import React from "react";
import styles from "./FriendList.module.css";
import FriendItem from "../friendItem/FriendItem";
const FriendList = ({ friendList }) => {
  return (
    <div>
      {friendList.length > 0 &&
        friendList.map((friend) => (
          <FriendItem
            key={friend.id}
            friendEmail={friend.email}
            friendId={friend.id}
            friendName={friend.name}
          />
        ))}
    </div>
  );
};

export default FriendList;
