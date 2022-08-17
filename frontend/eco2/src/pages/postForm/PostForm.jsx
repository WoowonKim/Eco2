import React, { useEffect, useState } from "react";
import styles from "./PostForm.module.css";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ShortGreenBtn } from "../../components/styled";
import { postCreate, postUpdate } from "../../store/post/postSlice";
import { getUserEmail, getUserId } from "../../store/user/common";
import { clearMission } from "../../store/mission/missionMainSlice";
import axiosService from "../../store/axiosService";

const PostForm = () => {
  const [fileImage, setFileImage] = useState("");
  const [file, setFile] = useState("");
  const [editText, setEditText] = useState("");
  const [text, setText] = useState("");
  const [id, setUserId] = useState(0);
  const [publicFlag, setPublicFlag] = useState(false);
  const [commentFlag, setCommentFlag] = useState(false);
  const [imageCheck, setImageCheck] = useState(false);
  const [originalImg, setOriginalImg] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  console.log("영제 확인 ===> ", location.state.customId);
  useEffect(() => {
    if (location.state?.content) {
      setEditText(location.state?.content);
      setImageCheck(true);
    }

    if (location.state?.postId) {
      axiosService({
        url: `${process.env.REACT_APP_BE_HOST}img/post/${location.state?.postId}`,
        method: "GET",
        responseType: "blob",
      }).then((res) => {
        const file = new File([res.data], "profileImg.png", {
          type: "image/png",
        });
        setOriginalImg(file);
      });
    }
  }, []);
  const saveFileImage = (e) => {
    setFile(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]));
    setImageCheck(true);
  };

  const dispatch = useDispatch();
  const missionClear = () => {
    dispatch(
      clearMission({ id, missionId: location.state?.missionIdTest })
    ).then((res) => {
      if (res.payload?.status === 200) {
        navigate("/mainTree");
      }
    });
  };
  // 글 작성 요청보내기
  const onSubmit = (e) => {
    console.log(location.state?.missionId);
    e.preventDefault();
    const formDataCreate = new FormData();
    const formDataUpdate = new FormData();
    const postUpdateDto = {
      content: editText,
      publicFlag: !publicFlag,
      commentFlag: !commentFlag,
    };

    if (location.state?.postId) {
      // 글 수정 시 해당 글 상세 페이지로 다시 이동
      const json = JSON.stringify(postUpdateDto);
      const blob = new Blob([json], {
        type: "application/json",
      });
      formDataUpdate.append("postImage", file ? file : originalImg);
      formDataUpdate.append("postUpdateDto", blob);

      dispatch(
        postUpdate({ postId: location.state?.postId, formData: formDataUpdate })
      ).then((res) => {
        if (res.payload?.status === 200) {
          navigate(`/post/${location.state?.postId}`);
        }
      });
    } else {
      if (location.state?.missionId) {
        const postCreateDto = {
          content: editText,
          user: {
            id: id,
          },
          mission: {
            id: location.state.missionId,
          },
          publicFlag: !publicFlag,
          commentFlag: !commentFlag,
        };
        const json = JSON.stringify(postCreateDto);
        const blob = new Blob([json], {
          type: "application/json",
        });
        formDataCreate.append("postImage", file);
        formDataCreate.append("postCreateDto", blob);
        dispatch(postCreate({ formData: formDataCreate }))
          .then((res) => {
            if (res.payload?.status === 200) {
              missionClear();
            }
          })

          .catch((err) => console.log(err));
      } else if (location.state?.customId) {
        const postCreateDto = {
          content: editText,
          user: {
            id: id,
          },
          customMission: {
            id: location.state.customId,
          },
          publicFlag: !publicFlag,
          commentFlag: !commentFlag,
        };
        const json = JSON.stringify(postCreateDto);
        const blob = new Blob([json], {
          type: "application/json",
        });
        formDataCreate.append("postImage", file);
        formDataCreate.append("postCreateDto", blob);
        dispatch(postCreate({ formData: formDataCreate }))
          .then((res) => {
            if (res.payload?.status === 200) {
              missionClear();
            }
          })

          .catch((err) => console.log(err));
      } else {
        const postCreateDto = {
          content: editText,
          user: {
            id: id,
          },
          quest: {
            id: location.state?.questId,
          },
          publicFlag: !publicFlag,
          commentFlag: !commentFlag,
        };
        const json = JSON.stringify(postCreateDto);
        const blob = new Blob([json], {
          type: "application/json",
        });
        formDataCreate.append("postImage", file);
        formDataCreate.append("postCreateDto", blob);
        dispatch(postCreate({ formData: formDataCreate }))
          .then((res) => {
            if (res.payload?.status === 200) {
              missionClear();
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  // 유저 아이디 가져오기
  useEffect(() => {
    setUserId(getUserId());
  }, []);
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles.fileInputGroup}>
          {fileImage ? (
            <img className={styles.img} alt="sample" src={fileImage} />
          ) : location.state?.postId ? (
            <img
              className={styles.img}
              alt="originalImg"
              src={`${process.env.REACT_APP_BE_HOST}img/post/${location.state.postId}`}
            />
          ) : null}
          {!fileImage && !imageCheck ? (
            <label htmlFor="file" className={styles.imgLabel}>
              인증 사진을 업로드 해주세요!
            </label>
          ) : (
            <label htmlFor="file" className={styles.imgLabelUpdate}>
              <i className={`fa-solid fa-pencil ${styles.editIcon}`}></i>
            </label>
          )}
          <input
            encType="multipart/form-data"
            type="file"
            id="file"
            name="post_file"
            onChange={saveFileImage}
            className={`${styles.fileInput} ${styles.baseFileInput}`}
          />
        </div>
        <div className={styles.wrapper}>
          <input
            className={styles.checkbox1}
            type="checkbox"
            id="post"
            onChange={(e) => {
              setPublicFlag(e.target.checked);
            }}
          />
          <label htmlFor="post" className={`${styles.label1} ${styles.label}`}>
            <div className={styles.dot}></div>
            <span className={styles.labelText}>게시물 비공개</span>
          </label>
          <input
            className={styles.checkbox2}
            type="checkbox"
            id="comment"
            onChange={(e) => {
              setCommentFlag(e.target.checked);
            }}
          />
          <label
            htmlFor="comment"
            className={`${styles.label2} ${styles.label}`}
          >
            <div className={styles.dot}></div>
            <span className={styles.labelText}>댓글 비공개</span>
          </label>
        </div>
        <textarea
          required
          placeholder="미션 인증글을 작성해주세요!"
          className={styles.content}
          value={editText ? editText : text}
          onChange={(e) => {
            setText(e.target.value);
            setEditText(e.target.value);
          }}
        ></textarea>
        <button type="submit" disabled={!imageCheck} className={styles.button}>
          작성
        </button>
      </form>
    </div>
  );
};

export default PostForm;
