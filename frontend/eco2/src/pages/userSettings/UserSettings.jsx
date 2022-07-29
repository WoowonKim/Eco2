import React from "react";
import styles from "./UserSettings.module.css";

const UserSettings = () => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <p className={styles.userInfoText}>회원정보</p>
          <hr className={styles.line} />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userInfoText}>계정 및 알림</p>
          <hr className={styles.line} />
        </div>
      </div>
      <div className={styles.profileImg}>
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="earth"
          className={styles.img}
        />
        <div className={styles.profileImgGroup}>
          <p className={styles.profileImgText}>프로필 사진</p>
          <i className={`fa-solid fa-pencil ${styles.editIcon}`}></i>
        </div>
      </div>
      <div className={styles.emailGroup}>
        <p className={styles.emailText}>이메일</p>
        <p className={styles.email}>abcd@abcd.com</p>
      </div>
      <div className={styles.econameGroup}>
        <div className={styles.econameTitle}>
          <p className={styles.econameText}>EcoName</p>
          <i className={`fa-solid fa-pencil ${styles.editIcon}`}></i>
        </div>
        <p className={styles.econame}>EcoName</p>
      </div>
      <div className={styles.passwordGroup}>
        <p className={styles.passwordText}>비밀번호 변경 / 탈퇴</p>
        <p className={styles.passwordText}>
          비밀번호를 변경하시거나 탈퇴를 하시려면 비밀번호를 확인해주세요
        </p>
        <form className={styles.passwordForm}>
          <input className={styles.passwordFormInput} type="text" />
          <button className={styles.passwordFormButton}>변경</button>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
