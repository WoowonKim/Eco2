import React, { useState } from "react";
import styles from "./PostModal.module.css";
import { getUserId } from "../../../store/user/common";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../store/post/postSlice";
const PostModal = (props) => {
  const { open, close, questDetail, closeDetail } = props;
  const [imageSrc, setImageSrc] = useState("");
  const [payload, setPayload] = useState({
    postImg: null,
    content: null,
  });
  const [imageCheck, setImageCheck] = useState(false);
  let navigate = useNavigate();
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  let dispatch = useDispatch();
  let setPayloadImg = (e) => {
    let copy = { ...payload };
    copy.postImg = e.target.files[0];
    setPayload(copy);
  };
  const onSubmit = (e) => {
    const formDataCreate = new FormData();
    console.log(payload);
    const postCreateDto = {
      content: payload.content,
      user: {
        id: getUserId(),
      },
      quest: {
        id: questDetail.id,
      },
    };
    const json = JSON.stringify(postCreateDto);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formDataCreate.append("postImage", payload.postImg);
    formDataCreate.append("postCreateDto", blob);
    dispatch(createPost({ formData: formDataCreate })).then((res) => {
      if (res.payload?.status === 200) {
        navigate("/mainTree");
      }
    });
    close();
    closeDetail();
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}>
      {open ? (
        <section>
          <header>참여하기</header>
          <main className={styles.main}>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className={styles.imgBox}>
                <label htmlFor="chooseFile" className={styles.imgBtn}>
                  인증 사진을 업로드 해주세요!
                </label>
                <input
                  encType="multipart/form-data"
                  type="file"
                  id="chooseFile"
                  className={styles.imgInput}
                  name="chooseFile"
                  accept="image/*"
                  onChange={(e) => {
                    encodeFileToBase64(e.target.files[0]);
                    setPayloadImg(e);
                    setImageCheck(true);
                  }}
                />
                {imageSrc && <img src={imageSrc} className={styles.previewImg}></img>}
              </div>
              <textarea
                id="content"
                required
                placeholder="미션 인증글을 작성해주세요!"
                className={styles.content}
                onChange={(e) => {
                  let copy = { ...payload };
                  copy.content = e.target.value;
                  setPayload(copy);
                }}
              ></textarea>
              <button type="submit" disabled={!imageCheck} className={styles.create}>
                인증하기
              </button>
              <button className={styles.close} onClick={close}>
                취소
              </button>
            </form>
          </main>

          <footer></footer>
        </section>
      ) : null}
    </div>
  );
};

export default PostModal;
