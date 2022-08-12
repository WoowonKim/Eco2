import React, { useState } from "react";
import styles from "./QuestModal.module.css";

const QuestModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
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
          <header>미션 생성하기</header>
          <main className={styles.main}>
            <select name="category" className={styles.selectBox}>
              <option value="카테고리 선택">미션 선택</option>
              <option value="수질">수질</option>
              <option value="땅">땅</option>
            </select>
            <p>퀘스트는 24시간 동안 유지됩니다.</p>
            <fieldset className={styles.fieldset}>
              <label>내용</label>
              <textarea id="content" />
            </fieldset>
          </main>
          <footer>
            <button className={styles.create}>생성하기</button>
            <button className={styles.close} onClick={close}>
              취소하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default QuestModal;
