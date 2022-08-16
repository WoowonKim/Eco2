import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import FriendList from "../../components/friend/friendList/FriendList";
import SearchForm from "../../components/searchForm/SearchForm";
import { friends } from "../../store/user/accountSlice";
import { getUserId } from "../../store/user/common";
import styles from "./UserFriends.module.css";

const UserFriends = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendDelete, setFriendDelete] = useState(0);
  const [query, setQuery] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();

  const onSearch = (query) => {
    console.log(query);
    dispatch(friends({ id: getUserId(), query })).then((res) => {
      if (res.payload?.status === 200) {
        setFriendList(res.payload?.friendList);
      }
    });
  };

  useEffect(() => {
    // 친구조회
    dispatch(friends({ id: getUserId() })).then((res) => {
      if (res.payload?.status === 200) {
        setFriendList(res.payload?.friendList);
      }
    });
  }, [friendDelete]);

  return (
    <div className={styles.container}>
      <SearchForm type={"frined"} onSearch={onSearch} />
      <div className={styles.friendContainer}>
        <FriendList friendList={friendList} setFriendDelete={setFriendDelete} />
      </div>
    </div>
  );
};

export default UserFriends;
