import React from "react";
import { useLocation } from "react-router-dom";
import FriendList from "../../components/friendList/FriendList";
import SearchForm from "../../components/searchForm/SearchForm";
import styles from "./UserFriends.module.css";

const UserFriends = () => {
  const location = useLocation();
  const userId = location?.state;
  return (
    <div>
      <SearchForm />
      <FriendList />
    </div>
  );
};

export default UserFriends;
