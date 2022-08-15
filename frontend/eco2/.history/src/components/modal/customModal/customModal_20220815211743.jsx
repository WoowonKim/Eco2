import React, { useState, useEffect } from "react";
import styles from "./customModal.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { customPostMission } from "../../../store/mission/customMissionSlice";
import { userInformation } from "../../../store/user/userSettingSlice";
import { getUserEmail } from "../../../store/user/common";

const CustomModal = props => {
  const { open, close } = props;
  const dispatch = useDispatch();
  const naviGate = useNavigate();
  const [id, setId] = useState(0);
  const [cate, setCate] = useState(0);
  const [tit, setTit] = useState("");
  const [cont, setCont] = useState("");
  useEffect(() => {
    dispatch(userInformation({ email: getUserEmail() })).then(res => {
      if (res.payload.status === 200) {
        setId(res.payload.user.id);
      }
    });
  }, []);

  const subMit = () => {
    dispatch(
      customPostMission({ id, category: cate, title: tit, content: cont })
    )
      .then(res => {
        if (res.payload.status === 200) {
          if (window.confirm("미션 목록에 추가하시겠어요>")) {
            naviGate("/dailymissiondetail", { state: { list: 0 } });
          }
        }
      })
      .catch(err => {
        console.log("error");
      });
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>나만의 미션 생성하기</header>
          <main className={styles.main}>
            {/* 카테고리 설정할 곳 */}
            {/* <select
              name="mission"
              onChange={e => {
                console.log(e.target.value);
                //setQNum(e.target.value);
               // payload.missionId = e.target.value;
              }}
              className={styles.selectBox}
            >
              {questList.map((item, i) => {
                return (
                  <option value={item.id} key={i}>
                    {item.title}
                  </option>
                );
              })}
            </select> */}
            <select name="category">
              <option value="0">카테고리</option>
              <option value="1">실천하기</option>
              <option value="1">사용하기</option>
              <option value="1">절약하기</option>
              <option value="1">구매하기</option>
              <option value="1">재활용하기</option>
            </select>
            <fieldset className={styles.fieldset}>
              <legend style={{ textAlign: "start" }}>
                미션 주제를 작성해주세요
              </legend>
              <textarea
                id="content"
                className={styles.contentBox}
                onChange={e => {
                  setCont(e.target.value);
                }}
              />
            </fieldset>
          </main>
          <footer>
            <button className={styles.create} onClick={subMit}>
              생성하기
            </button>
            <button className={styles.close} onClick={close}>
              취소하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default CustomModal;
