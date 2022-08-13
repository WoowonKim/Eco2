import React from "react";
import { useLocation } from "react-router-dom";
import FriendList from "../../components/friend/friendList/FriendList";
import SearchForm from "../../components/searchForm/SearchForm";
import styles from "./UserFriends.module.css";

const UserFriends = () => {
  const location = useLocation();
  const userId = location?.state.userId;
  const friendList = location?.state.friendList;

  return (
    <div>
      <SearchForm />
      <FriendList friendList={friendList} />
    </div>
  );
};

export default UserFriends;
