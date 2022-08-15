import React, { useState } from "react";
import { getUserId } from "../../../store/user/common";
import styles from "./QuestModal.module.css";

const QuestModal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, questList, setPayload, setMakeFlag } = props;
  const [qNUm, setQNum] = useState(2);
  let payload = {
    userId: getUserId(),
    missionId: 2,
    lat: null,
    lng: null,
    achieveCount: 3,
    content: "",
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>나만의 미션 생성하기</header>
          <main className={styles.main}>
            <select
              name="mission"
              onChange={e => {
                console.log(e.target.value);
                setQNum(e.target.value);
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
            <span className={styles.span} htmlFor="achieveCount">
              목표 참여 인원
            </span>
            <input
              type="number"
              name="achieveCount"
              min="3"
              max="100"
              defaultValue={3}
              className={styles.numInput}
              onChange={e => {
                payload.achieveCount = e.target.value;
              }}
            ></input>
            <fieldset className={styles.fieldset}>
              <legend style={{ textAlign: "start" }}>about mission</legend>
              <textarea
                id="content"
                className={styles.contentBox}
                onChange={e => {
                  payload.content = e.target.value;
                }}
              />
            </fieldset>
            <p className={styles.p}>퀘스트는 24시간 동안 유지됩니다.</p>
          </main>
          <footer>
            <button
              className={styles.create}
              onClick={() => {
                console.log(payload);
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
