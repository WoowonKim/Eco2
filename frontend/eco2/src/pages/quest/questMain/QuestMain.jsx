import React, { useState } from "react";
import Map from "../../../components/map/Map";
import { getUserName } from "../../../store/user/common";
import styles from "./QuestMain.module.css";
import QuestModal from "../../../components/modal/questModal/QuestModal";
const QuestMain = () => {
  const [count, setCount] = useState(0);
  const [makeFlag, setMakeFlag] = useState(false);
  const name = getUserName();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div className={styles.titleGroup}>
        <p className={styles.title}>퀘스트 조회하기</p>
        <button
          className={styles.button}
          onClick={() => {
            setMakeFlag(!makeFlag);
          }}
        >
          {makeFlag ? "취소하기" : "생성하기"}
        </button>
      </div>
      <Map makeFlag={makeFlag} open={openModal} setMakeFlag={setMakeFlag} />
      <div>
        <p className={styles.text}>
          {name}님 주변에는 현재 {count}개의 퀘스트가 있습니다.
        </p>
      </div>
      <QuestModal open={modalOpen} close={closeModal} header="Modal heading">
        {/* // Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 */}
        함수형 모달 팝업창입니다. 쉽게 만들 수 있어요. 같이 만들어봐요!
      </QuestModal>
    </div>
  );
};

export default QuestMain;
