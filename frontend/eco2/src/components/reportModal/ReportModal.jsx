import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ReportModal.module.css'

const ReportModal = () => {
  const [hidden, setHidden] = useState(false);
  const displayType = hidden ? styles.hidden : null;
  const dispatch = useDispatch();

  return (
    <div className={`${displayType} ${styles.modal}`}>
      <div className={styles.modalTitle}>
        <i className={`fa-solid fa-circle-exclamation ${styles.reportIcon}`}></i>
        <h2 className={styles.title}>게시물 신고</h2>
      </div>
      <p className={styles.content}>해당 게시물을 신고하시겠습니까?</p>
      <p className={styles.content}>신고 유형과 내용을 입력해주세요</p>
      <div className={styles.selectBox}>
        <select
          name="category"
          className={styles.select}
        >
          <option className={styles.option} value="">
            신고 유형 선택
          </option>
          <option className={styles.option} value="do">
            욕설
          </option>
          <option className={styles.option} value="use">
            미션 내용과 무관한 인증글
          </option>
          <option className={styles.option} value="save">
            미션 내용과 무관한 사진
          </option>
          <option className={styles.option} value="buy">
            음란물
          </option>
          <option className={styles.option} value="recycle">
            기타
          </option>
        </select>
      </div>
      <textarea className={styles.textarea}></textarea>
      <div className={styles.buttonGroup}>
        <button className={styles.reportButton}>신고</button>
        <button
          onClick={() => setHidden(true)}
          className={`${styles.cancleButton}`}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ReportModal;