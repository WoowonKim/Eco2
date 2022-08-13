import React, { useState } from "react";
import { getUserId } from "../../../store/user/common";
import styles from "./QuestModal.module.css";

const QuestModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, questList, setPayload, setMakeFlag } = props;
  let payload = {
    userId: getUserId(),
    missionId: 2,
    lat: null,
    lng: null,
    achieveCount: 100,
    content: "",
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
            <select
              name="mission"
              onChange={(e) => {
                console.log(e.target.value);
                payload.missionId = e.target.value;
              }}
              className={styles.selectBox}
            >
              {questList.map((item, i) => {
                return (
                  <option value={item.id} key={i}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <p>퀘스트는 24시간 동안 유지됩니다.</p>
            <fieldset className={styles.fieldset}>
              <label>내용</label>
              <textarea
                id="content"
                onChange={(e) => {
                  payload.content = e.target.value;
                }}
              />
            </fieldset>
          </main>
          <footer>
            <button
              className={styles.create}
              onClick={() => {
                setPayload(payload);
                close();
                setMakeFlag(true);
              }}
            >
              생성하기
            </button>
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
