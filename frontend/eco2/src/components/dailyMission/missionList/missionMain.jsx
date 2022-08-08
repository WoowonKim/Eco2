import React, { useState } from "react";
import styles from "./dailyMission.module.css";
import { useNavigate } from "react-router-dom";
import MissionModal from "../missionClear/missionModal";
import { deleteMission } from "../../../store/mission/missionMainSlice";
import { useDispatch } from "react-redux/es/exports";

const MissionMain = ({ idTest, content, trashCnt, missionType, missionIdTest }) => {
  const naviGate = useNavigate();
  const [trash, setTrash] = useState(true);
  const [doitMission, setDoitMission] = useState(true);
  const trashType = trash ? styles.greenTrash : styles.whiteTrash;
  const dispatch = useDispatch();
  // const onListRemove = () => {
  //   alert(`${id}를 삭제 완료!`);
  // };
  const boolCheck = () => {
    console.log(doitMission);
    if (doitMission) {
      if (window.confirm("미션완료!! 인증게시글 업로드 하시겠어요?")) {
        naviGate("/post");
      } else {
        alert("인증게시글 업로드도 부탁해요 ㅠㅠ!");
      }
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // const onDeleteMission = () => {
  //   dispatch(deleteMission({ id: id, missionId: missionId }));
  // };

  return (
    <div>
      {/* <MissionModal open={modalOpen} close={closeModal} header="Daily Mission">
        미션 성공을 축하 드립니다 :)
      </MissionModal> */}
      <div className={styles.mainList}>
        <input
          type={"checkbox"}
          onClick={() => {
            setDoitMission(!doitMission);
            setTrash(!trash);
            trashCnt(!trash);
            boolCheck();
          }}
        ></input>
        <span>{content}</span>
        <i
          className={`${"fa-solid fa-trash-can"} ${trashType}`}
          onClick={() => {
            dispatch(deleteMission({ id: idTest, missionId: missionIdTest }));
            // console.log("클릭시 미션 아이디 ===> ", missionIdTest);
            // console.log("클릭시 내 아이디 ===> ", idTest);
          }}
        ></i>
      </div>
    </div>
  );
};

export default MissionMain;
