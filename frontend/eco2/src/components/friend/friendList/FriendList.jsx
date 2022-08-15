import React from "react";
import styles from "./FriendList.module.css";
import FriendItem from "../friendItem/FriendItem";
const FriendList = ({ friendList, setFriendDelete }) => {
  return (
    <>
      {friendList.length > 0 &&
        friendList.map((friend) => (
          <FriendItem
            key={friend.id}
            friendEmail={friend.email}
            friendId={friend.id}
            friendName={friend.name}
            setFriendDelete={setFriendDelete}
          />
        ))}
    </>
  );
};

export default FriendList;
