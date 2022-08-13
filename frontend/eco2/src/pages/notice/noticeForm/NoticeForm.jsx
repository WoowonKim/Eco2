import React, { useEffect, useState } from "react";
import styles from "./NoticeForm.module.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { noticeCreate, noticeUpdate } from "../../../store/admin/noticeSlice";
import { getUserId } from "../../../store/user/common";

const NoticeForm = () => {
  const [urgentFlag, setUrgentFlag] = useState(false);
  const [editText, setEditText] = useState("");
  const [text, setText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    if (location.state?.noticeId) {
      dispatch(
        noticeUpdate({
          noticeId: location.state?.noticeId,
          title: editTitle,
          content: editText,
          urgentFlag,
        })
      ).then((res) => {
        if (res.payload?.status === 200) {
          navigate("/user/settings", { state: { notice: 3 } });
        }
      });
    } else {
      console.log(getUserId());
      dispatch(noticeCreate({ userId, title, content: text, urgentFlag })).then(
        (res) => {
          if (res.payload?.status === 200) {
            navigate("/user/settings", { state: { notice: 3 } });
          }
        }
      );
    }
  };

  useEffect(() => {
    if (location.state?.noticeId) {
      setEditText(location.state?.noticeContent);
      setEditTitle(location.state?.noticeTitle);
    }
    setUserId(getUserId());
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.titleGroup}>
        <i className={`fa-brands fa-pagelines ${styles.titleIcon}`}></i>
        <h2 className={styles.title}>공지 작성</h2>
      </div>
      <hr className={styles.line} />
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles.wrapper}>
          <input
            className={styles.radioInput1}
            name="urgent"
            type="radio"
            id="urgent"
            onChange={(e) => {
              if (e.currentTarget.value) {
                setUrgentFlag(true);
              }
            }}
          />
          <input
            className={styles.radioInput2}
            name="urgent"
            type="radio"
            id="normal"
            onChange={(e) => {
              if (e.currentTarget.value) {
                setUrgentFlag(false);
              }
            }}
          />
          <label
            htmlFor="urgent"
            className={`${styles.label1} ${styles.label}`}
          >
            <div className={styles.dot}></div>
            <span className={styles.labelText}>긴급</span>
          </label>
          <label
            htmlFor="normal"
            className={`${styles.label2} ${styles.label}`}
          >
            <div className={styles.dot}></div>
            <span className={styles.labelText}>일반</span>
          </label>
        </div>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="제목을 입력해주세요"
          value={editTitle ? editTitle : title}
          onChange={(e) => {
            setTitle(e.target.value);
            setEditTitle(e.target.value);
          }}
          required
        />
        <textarea
          required
          className={styles.content}
          value={editText ? editText : text}
          onChange={(e) => {
            setText(e.target.value);
            setEditText(e.target.value);
          }}
        ></textarea>
        <button type="submit" className={styles.button}>
          작성
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;
