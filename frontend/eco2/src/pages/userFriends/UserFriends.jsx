import React from "react";
import FriendList from "../../components/friendList/FriendList";
import SearchForm from "../../components/searchForm/SearchForm";
import styles from "./UserFriends.module.css";

const UserFriends = () => {
  return (
    <div>
      <SearchForm />
      <FriendList />
    </div>
  );
};

export default UserFriends;
