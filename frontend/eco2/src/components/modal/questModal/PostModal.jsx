import React, { useState } from "react";
import styles from "./PostModal.module.css";
import FeedList from "../../feed/feedList/FeedList";
const PostModal = (props) => {
  const { open, close } = props;
  const [imageSrc, setImageSrc] = useState("");
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>인증하기</header>
          <main className={styles.main}>
            <div className={styles.imgBox}>
              <label htmlFor="chooseFile" className={styles.imgBtn}>
                사진 업로드하기
              </label>
              <input
                type="file"
                id="chooseFile"
                className={styles.imgInput}
                name="chooseFile"
                accept="image/*"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              />
              {imageSrc && (
                <img src={imageSrc} className={styles.previewImg}></img>
              )}
            </div>
            <div className={styles.info}>
              <div>공원 미화</div>
              <div>대전광역시 유성구 유림공원</div>
              <div>22:17 이후 퀘스트가 종료됩니다.</div>
              <div>97명이 참여 했어요!</div>
            </div>
          </main>
          <footer>
            <button className={styles.create}>인증하기</button>
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

export default PostModal;
