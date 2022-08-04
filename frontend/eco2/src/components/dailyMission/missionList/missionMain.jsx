import React, { useState } from "react";
import styles from "./dailyMission.module.css";
import { useNavigate } from "react-router-dom";
import MissionModal from "../missionClear/missionModal";
import { deleteMission } from "../../../store/mission/missionMainSlice";
import { useDispatch } from "react-redux/es/exports";

const MissionMain = ({ id, content, trashCnt, missionType, missionId }) => {
  const [trash, setTrash] = useState(true);
  const [doitMission, setDoitMission] = useState(false);
  const trashType = trash ? styles.greenTrash : styles.whiteTrash;
  const dispatch = useDispatch();
  const onListRemove = () => {
    alert(`${id}를 삭제 완료!`);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onDeleteMission = (deleteId, missionType, missionId) => {
    dispatch(deleteMission({ id: deleteId, missionId: missionId, missionType: missionType }));
    console.log(deleteId);
    console.log(missionId);
    console.log(missionType);
  };

  return (
    <div>
      <MissionModal open={modalOpen} close={closeModal} header="Daily Mission">
        미션 성공을 축하 드립니다 :)
      </MissionModal>
      <div className={styles.mainList}>
        <input
          type={"checkbox"}
          onClick={() => {
            setDoitMission(!doitMission);
            setTrash(!trash);
            trashCnt(!trash);
            openModal();
          }}
        ></input>
        <span>{content}</span>
        <i
          className={`${"fa-solid fa-trash-can"} ${trashType}`}
          onClick={() => {
            onDeleteMission(id, missionId, missionType);
          }}
        ></i>
      </div>
    </div>
  );
};

export default MissionMain;
