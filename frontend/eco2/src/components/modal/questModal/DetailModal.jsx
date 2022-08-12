import React, { useState } from "react";
import styles from "./DetailModal.module.css";
import FeedList from "../../feed/feedList/FeedList";
const DetailModal = (props) => {
  // 열기, 닫기
  const { open, close, content, openPost } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>참여하기</header>
          <main className={styles.main}>
            <div className={styles.imgBox}>
              <img src={content.imgURL} className={styles.img}></img>
            </div>
            <div className={styles.info}>
              <div>공원 미화</div>
              <div>대전광역시 유성구 유림공원</div>
              <div>22:17 이후 퀘스트가 종료됩니다.</div>
              <div>97명이 참여 했어요!</div>
              <div>{content.title}</div>
              <div>{content.content}</div>
            </div>
          </main>
          <footer>
            <button className={styles.create} onClick={openPost}>
              인증하기
            </button>
            <button className={styles.close} onClick={close}>
              참여안하기
            </button>
          </footer>
          <div>참여자 인증글</div>
          <FeedList display={"list"}></FeedList>
        </section>
      ) : null}
    </div>
  );
};

export default DetailModal;
