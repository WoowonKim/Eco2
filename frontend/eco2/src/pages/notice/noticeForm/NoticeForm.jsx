import React, { useEffect, useState } from "react";
import styles from "./NoticeForm.module.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { noticeCreate, noticeUpdate } from "../../../store/admin/noticeSlice";
import { getUserId } from "../../../store/user/common";

const NoticeForm = () => {
  const [selected, setSelected] = useState("");
  const [editText, setEditText] = useState("");
  const [text, setText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = getUserId();

  const onSubmit = (e) => {
    e.preventDefault();
    if (location.state?.noticeId) {
      dispatch(noticeUpdate({}));
    } else {
      dispatch(
        noticeCreate({ userId, title, content: text, urgentFlag: false })
      ).then((res) => {
        if (res.payload?.status === 200) {
          navigate("/user/settings");
        }
      });
    }
  };
  return (
    <div>
      <div className={styles.titleGroup}>
        <i className={`fa-brands fa-pagelines ${styles.titleIcon}`}></i>
        <h2 className={styles.title}>공지 작성</h2>
      </div>
      <hr className={styles.line} />
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles.selectBox}>
          <label htmlFor="urgent">긴급</label>
          <input name="urgent" type="radio" id="urgent" />
          <label htmlFor="normal">일반</label>
          <input name="urgent" type="radio" id="normal" />
        </div>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={editTitle ? editTitle : title}
          onChange={(e) => {
            setTitle(e.target.value);
            setEditTitle(e.target.value);
          }}
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
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default NoticeForm;
