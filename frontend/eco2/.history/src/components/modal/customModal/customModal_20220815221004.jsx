import React, { useState, useEffect } from "react";
import styles from "./customModal.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { customPostMission } from "../../../store/mission/customMissionSlice";
import { userInformation } from "../../../store/user/userSettingSlice";
import { getUserEmail } from "../../../store/user/common";

const CustomModal = ({ open, close, setcusModal }) => {
  // const { open, close } = props;
  const dispatch = useDispatch();
  const naviGate = useNavigate();
  const [id, setId] = useState(0);
  const [cate, setCate] = useState(1);
  const [tit, setTit] = useState("");
  const [cont, setCont] = useState("");

  const selectList = [
    {
      id: 1,
      title: "실천하기",
    },
    {
      id: 2,
      title: "사용하기",
    },
    {
      id: 3,
      title: "절약하기",
    },
    {
      id: 4,
      title: "구매하기",
    },
    {
      id: 5,
      title: "재활용하기",
    },
  ];
  const [selected, setSelected] = useState(1);
  const handleSelect = e => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    dispatch(userInformation({ email: getUserEmail() })).then(res => {
      if (res.payload.status === 200) {
        setId(res.payload.user.id);
      }
    });
  }, []);

  const subMit = () => {
    dispatch(
      customPostMission({ id, category: selected, title: tit, content: cont })
    )
      .then(res => {
        if (res.payload.status === 200) {
          naviGate("/dailymissiondetail", { state: { list: 0 } });
          setcusModal();
          console.log("이거보여요?");
        }
      })
      .catch(err => {
        console.log("error");
      });
  };

  return (
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>나만의 미션 생성하기</header>
          <main className={styles.main}>
            <i className={`${"fa-solid fa-calendar-check"} ${styles.icon}`}></i>
            <select onChange={handleSelect} value={selected}>
              {selectList.map((item, idx) => (
                <option value={item.id} key={idx}>
                  {item.title}
                </option>
              ))}
            </select>
            <fieldset className={styles.fieldset}>
              <legend style={{ textAlign: "start" }}>
                <i
                  className={`${"fa-solid fa-pen-to-square"} ${styles.icon}`}
                ></i>
                미션 주제를 작성해주세요
              </legend>
              <textarea
                id="content"
                className={styles.contentBox}
                placeholder="수행할 미션 주제를 작성해주세요&#13;&#10;(ex_달리기 하면서 쓰레기줍기)"
                onChange={e => {
                  setTit(e.target.value);
                  setCont(e.target.value);
                }}
              />
            </fieldset>
          </main>
          <footer>
            <button
              className={styles.create}
              onClick={() => {
                subMit();
                close();
              }}
            >
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
