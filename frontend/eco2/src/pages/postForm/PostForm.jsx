import React, { useEffect, useState } from "react";
import styles from "./PostForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../store/mainFeed/feedSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShortGreenBtn } from "../../components/styled";

const PostForm = ({ img, content, id, category }) => {
  const [fileImage, setFileImage] = useState("");
  const [selected, setSelected] = useState("");
  const [editText, setEditText] = useState("");
  const [text, setText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state.content) {
      setEditText(location.state?.content);
    }
  }, []);
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const deleteFileImage = (e) => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    if (location.state?.id) {
      dispatch(updatePost({ id: location.state?.id, content: editText }));
      navigate(`/post/${location.state?.id}`);
      console.log(location.state.id, editText);
    } else {
      dispatch(addPost({ category: selected, content, src: fileImage }));
      navigate(`/post/${location.state?.id}`);
    }
  };
  return (
    <div>
      <h1 className={styles.title}>인증하기</h1>
      <form onSubmit={onSubmit}>
        <div>
          {fileImage && (
            <img
              className={styles.img}
              alt="sample"
              src={location.state?.img ? img : fileImage}
            />
          )}
        </div>
        <div className={styles.fileInputGroup}>
          <input
            className={styles.fileInput}
            value="첨부파일"
            placeholder="첨부파일"
          />
          <label htmlFor="file" className={styles.imgLabel}>
            파일찾기
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={saveFileImage}
            className={`${styles.fileInput} ${styles.baseFileInput}`}
          />
          <button onClick={() => deleteFileImage()} className={styles.button}>
            삭제
          </button>
        </div>
        <div className={styles.selectBox}>
          <select
            name="category"
            onChange={(e) => {
              setSelected(e.target.value);
            }}
            value={location.state?.category}
            className={styles.select}
          >
            <option className={styles.option} value="">
              카테고리 선택
            </option>
            <option className={styles.option} value="do">
              실천하기
            </option>
            <option className={styles.option} value="use">
              사용하기
            </option>
            <option className={styles.option} value="save">
              절약하기
            </option>
            <option className={styles.option} value="buy">
              구매하기
            </option>
            <option className={styles.option} value="recycle">
              재활용하기
            </option>
          </select>
        </div>
        <p className={styles.missionTitle}>미션 제목</p>
        <textarea
          required
          className={styles.content}
          value={editText ? editText : text}
          onChange={(e) => {
            setText(e.target.value);
            setEditText(e.target.value);
          }}
        ></textarea>
        <ShortGreenBtn type="submit">작성</ShortGreenBtn>
      </form>
    </div>
  );
};

export default PostForm;
