import React, { useEffect, useState } from "react";
import PostModal from "../postModal/PostModal";
import styles from "./ReportModal.module.css";

const ReportModal = ({
  title,
  content,
  closeModal,
  postId,
  commentId,
  type,
}) => {
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(5);
  const displayType = hidden ? styles.hidden : null;
  const [message, setMessage] = useState("");

  /* 화살표 함수 */
  // const label = document.getElementById("label");
  // const options = document.querySelectorAll("li");
  // const handleSelect = (item) => {
  //   label.parentNode.classList.remove("active");
  //   label.innerHTML = item.textContent;
  // };
  // console.log(label, options);
  // options.forEach((option) => {
  //   option.addEventListener("click", () => handleSelect(option));
  // });

  // const onClick = () => {
  //   if (label.parentNode.classList.contains("active")) {
  //     label.parentNode.classList.remove("active");
  //   } else {
  //     label.parentNode.classList.add("active");
  //   }
  // };

  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);
  return (
    <>
      {!visible && (
        <div className={`${displayType} ${styles.modal}`} onClick={closeModal}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={styles.modalBody}
          >
            <div className={styles.modalTitle}>
              <i
                className={`fa-solid fa-circle-exclamation ${styles.reportIcon}`}
              ></i>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <p className={styles.content}>{content}</p>
            <p className={styles.content}>신고 유형과 내용을 입력해주세요</p>
            <div className={styles.selectBox}>
              <select
                name="category"
                className={styles.select}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option className={styles.option} value="5">
                  신고 유형 선택
                </option>
                <option className={styles.option} value="1">
                  욕설
                </option>
                <option className={styles.option} value="2">
                  음란물
                </option>
                <option className={styles.option} value="3">
                  허위인증
                </option>
                <option className={styles.option} value="4">
                  광고
                </option>
                <option className={styles.option} value="5">
                  기타
                </option>
              </select>
              {/* <button className={styles.label} onClick={onClick} id="label">
                fruits 🍊
              </button>
              <ul className={styles.optionList}>
                <li
                  className={styles.optionItem}
                  id="optionItem"
                  onClick={(e) => handleSelect(e.value)}
                >
                  apple
                </li>
                <li
                  className={styles.optionItem}
                  id="optionItem"
                  onClick={(e) => handleSelect(e.value)}
                >
                  orange
                </li>
                <li
                  className={styles.optionItem}
                  id="optionItem"
                  onClick={(e) => handleSelect(e.value)}
                >
                  grape
                </li>
                <li
                  className={styles.optionItem}
                  id="optionItem"
                  onClick={(e) => handleSelect(e.value)}
                >
                  melon
                </li>
              </ul> */}
            </div>
            <textarea
              className={styles.textarea}
              value={message}
              placeholder="메시지를 입력하세요"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => {
                  setVisible(!visible);
                  // setHidden(true);
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
