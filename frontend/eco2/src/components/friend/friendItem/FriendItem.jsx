import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { friendDelete } from "../../../store/user/accountSlice";
import { getUserId } from "../../../store/user/common";
import styles from "./FriendItem.module.css";

const FriendItem = ({ friendEmail, friendId, friendName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFriendDelete = () => {
    dispatch(friendDelete({ id: getUserId(), friendId })).then((res) => {
      if (res.payload.status === 200) {
        console.log(res.payload);
      }
    });
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.friendProfile}
        onClick={() =>
          navigate(`/profile/${friendId}`, {
            state: { userEmail: friendEmail },
          })
        }
      >
        <img
          src={`${process.env.REACT_APP_BE_HOST}img/profile/${friendId}`}
          alt="profile"
          className={styles.profileImg}
        />
        <span className={styles.friendName}>{friendName}</span>
      </div>
      <button className={styles.button} onClick={handleFriendDelete}>
        <i className={`fa-solid fa-trash ${styles.trash}`}></i>
      </button>
    </div>
  );
};

export default FriendItem;
