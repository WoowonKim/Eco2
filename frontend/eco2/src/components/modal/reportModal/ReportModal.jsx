import React, { useEffect, useState } from "react";
import PostModal from "../postModal/PostModal";
import styles from "./ReportModal.module.css";

const ReportModal = ({ title, content, closeModal, postId, commentId, type }) => {
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(5);
  const displayType = hidden ? styles.hidden : null;
  const [message, setMessage] = useState("");

  const [clicked, setClicked] = useState(false);
  const [ttype, setType] = useState("신고 유형 선택");

  const handleSelect = (value) => {
    setType(value);
    setClicked(false);
    value === "욕설"
      ? setSelected(1)
      : value === "음란물"
      ? setSelected(2)
      : value === "허위인증"
      ? setSelected(3)
      : value === "광고"
      ? setSelected(4)
      : setSelected(5);
  };

  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  return (
    <>
      {!visible && (
        <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()} className={styles.modalBody}>
            <div className={styles.modalTitle}>
              <i className={`fa-solid fa-circle-exclamation ${styles.reportIcon}`}></i>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <p className={styles.content}>{content}</p>
            <p className={styles.content}>신고 유형과 내용을 입력해주세요</p>
            <div className={styles.selectBox2}>
              <button className={styles.label} onClick={() => setClicked(!clicked)} id="label">
                {ttype}
                <i className="fa-solid fa-angle-down"></i>
              </button>
              {clicked && (
                <ul className={styles.optionList}>
                  <li className={styles.optionItem} id="optionItem" onClick={(e) => handleSelect(e.target.innerText)}>
                    욕설
                  </li>
                  <li className={styles.optionItem} id="optionItem" onClick={(e) => handleSelect(e.target.innerText)}>
                    음란물
                  </li>
                  <li className={styles.optionItem} id="optionItem" onClick={(e) => handleSelect(e.target.innerText)}>
                    허위인증
                  </li>
                  <li className={styles.optionItem} id="optionItem" onClick={(e) => handleSelect(e.target.innerText)}>
                    광고
                  </li>
                  <li className={styles.optionItem} id="optionItem" onClick={(e) => handleSelect(e.target.innerText)}>
                    기타
                  </li>
                </ul>
              )}
            </div>
            <textarea className={styles.textarea} value={message} placeholder="메시지를 입력하세요" onChange={(e) => setMessage(e.target.value)}></textarea>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => {
                  setVisible(!visible);
                }}
                className={styles.reportButton}
                disabled={message.trim().length == 0}
              >
                신고
              </button>
              <button
                onClick={() => {
                  setHidden(true);
                  document.body.style = `overflow: auto`;
                }}
                className={`${styles.cancleButton}`}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
      {visible && (
        <PostModal
          title={`${type} 신고`}
          content={"신고를 접수하시겠습니까?"}
          type={"신고"}
          postId={postId}
          commentId={commentId}
          selected={selected}
          message={message}
        />
      )}
    </>
  );
};

export default ReportModal;
