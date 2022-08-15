import React, { useEffect, useState } from "react";
import styles from "./PostModal.module.css";
import { getUserId } from "../../../store/user/common";
import { useDispatch } from "react-redux";
import { createPost } from "../../../store/quest/questSlice";
const PostModal = (props) => {
  const { open, close, questDetail, closeDetail } = props;
  const [imageSrc, setImageSrc] = useState("");
  const [payload, setPayload] = useState({
    postImg: null,
    content: null,
  });
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

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>인증하기</header>
          <main className={styles.main}>
            <div className={styles.imgBox}>
              <label htmlFor="chooseFile" className={styles.imgBtn}>
                사진 업로드하기
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
                }}
              />
              {imageSrc && (
                <img src={imageSrc} className={styles.previewImg}></img>
              )}
            </div>
            <div className={styles.info}>
              <div>{questDetail.mission.title}</div>
              <div>{questDetail.content}</div>
            </div>
            <fieldset className={styles.fieldset}>
              <label>내용</label>
              <textarea
                id="content"
                onChange={(e) => {
                  let copy = { ...payload };
                  copy.content = e.target.value;
                  setPayload(copy);
                }}
              />
            </fieldset>
          </main>
          <footer>
            <button
              className={styles.create}
              onClick={() => {
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
                dispatch(createPost({ formData: formDataCreate }));
                close();
                closeDetail();
              }}
            >
              인증하기
            </button>
            <button className={styles.close} onClick={close}>
              참여안하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default PostModal;
