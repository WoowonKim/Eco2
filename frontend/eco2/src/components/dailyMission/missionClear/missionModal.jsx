import React from "react";
import styles from "./missionModal.module.css";
import { useNavigate } from "react-router-dom";

const MissionModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const naviGate = useNavigate();
  const onMoved = () => {
    naviGate("/missionClear");
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={`open ? "${styles.K}" : "${styles.Z}"`}>
      {open ? (
        <section className={styles.B}>
          <header className={styles.C}>
            {header}
            <button className={styles.D} onClick={close}>
              &times;
            </button>
          </header>
          <main className={styles.E}>{props.children}</main>
          <footer className={styles.F}>
            <button className={styles.H} onClick={onMoved}>
              인증하기
            </button>
            <button className={styles.G} onClick={close}>
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default MissionModal;
