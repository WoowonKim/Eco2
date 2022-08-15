import React, { useState } from "react";
import { useEffect } from "react";
import { getUserId } from "../../../store/user/common";
import styles from "./QuestModal.module.css";

const QuestModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, questList, setPayload, setMakeFlag } = props;
  const [load, setLoad] = useState({
    userId: getUserId(),
    missionId: 2,
    lat: null,
    lng: null,
    achieveCount: 3,
    content: "",
  });
  const [qNUm, setQNum] = useState(2);
  useEffect(() => {
    setQNum(2);
  }, [open]);
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>퀘스트 생성하기</header>
          <main className={styles.main}>
            <div className={styles.selectBox}>
              <select
                name="mission"
                onChange={(e) => {
                  setQNum(e.target.value);
                  let copy = { ...load };
                  copy.missionId = e.target.value;
                  setLoad(copy);
                }}
                className={styles.select}
              >
                {questList.map((item, i) => {
                  return (
                    <option className={styles.option}
                     value={item.id} key={i}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
              <span className={styles.icoArrow}>
                <i className="fa-solid fa-arrow-down"></i>
              </span>
            </div>
            <div className={styles.countBox}>
            <div className={styles.countTitle} htmlFor="achieveCount">
              목표 참여 인원
            </div>
            <input
              type="number"
              name="achieveCount"
              min="3"
              max="100"
              defaultValue={3}
              className={styles.numInput}
              onChange={(e) => {
                let copy = { ...load };
                copy.achieveCount = e.target.value;
                setLoad(copy);
              }}
            ></input>
            </div>
            <div className={styles.contentBox}>
            <div className={styles.contentTitle}>퀘스트 내용</div>
            <textarea
                id="content"
                className={styles.contentText}
                onChange={(e) => {
                  let copy = { ...load };
                  copy.content = e.target.value;
                  setLoad(copy);
                }}
              />
              </div>
            {/* <p className={styles.p}>퀘스트는 24시간 동안 유지됩니다.</p> */}
          </main>
          <footer>
            <button
              className={styles.create}
              onClick={() => {
                setPayload(load);
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
