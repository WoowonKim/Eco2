import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { friendDelete } from "../../../store/user/accountSlice";
import { getUserId } from "../../../store/user/common";
import PostModal from "../../modal/postModal/PostModal";
import styles from "./FriendItem.module.css";

const FriendItem = ({ friendEmail, friendId, friendName, setFriendDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [test, setTest] = useState(false);

  const displayType = modalType ? styles.visible : styles.hidden;

  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${styles.container} ${
          test ? styles.buttonVisible : styles.buttonHidden
        }`}
        onClick={() => {
          setTest(!test);
        }}
      >
        <div
          className={styles.friendProfile}
          onClick={() => {
            navigate(`/profile/${friendId}`, {
              state: { userEmail: friendEmail },
            });
            setTest(!test);
          }}
        >
          <img
            src={`${process.env.REACT_APP_BE_HOST}img/profile/${friendId}`}
            alt="profile"
            className={styles.profileImg}
          />
          <span className={styles.friendName}>{friendName}</span>
        </div>
        <i className="fa-solid fa-angle-left"></i>
        <button
          className={styles.testButton}
          onClick={() => {
            setModalVisible(!modalVisible);
            setModalType("삭제");
          }}
        >
          삭제
        </button>
        {/* </div> */}
      </div>
      {modalVisible && modalType === "삭제" && (
        <PostModal
          className={`${displayType}`}
          title={"친구 삭제"}
          content={`${friendName}님을 친구 목록에서 삭제하시겠습니까?`}
          type={"친구삭제"}
          friendId={friendId}
          setFriendDelete={setFriendDelete}
          closeModal={() => setModalVisible(!modalVisible)}
        />
      )}
    </>
  );
};

export default FriendItem;
