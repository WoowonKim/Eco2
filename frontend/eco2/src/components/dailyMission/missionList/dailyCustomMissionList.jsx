import React, { useState, useEffect } from "react";
import styles from "./dailyMissionDetail.module.css";
import { customMission } from "../../../store/mission/customMissionSlice";
import { useDispatch } from "react-redux/es/exports";
import ZeroCustom from "./zeroCustom";
import NotZeroCustom from "./notZeroCustom";
import CustomModal from "../../modal/customModal/customModal";

const DailyCustomMissionList = ({ id }) => {
  const [cos, setCos] = useState([]);

  const [cusDelete, setCusDelete] = useState(false);
  const [cusSubmit, setCusSubmit] = useState(false);
  const [cusModal, setcusModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customMission({ id })).then((res) => {
      setCos(res.payload.customMissionList);
    });
  }, [cusSubmit, cusDelete, cusModal]);

  const openCreateModal = () => {
    setCreateModal(true);
  };
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  const cusModalT = () => {
    setcusModal(!cusModal);
  };

  return (
    <div>
      {cos.length !== 0 ? (
        <div>
          {cos.map((it) => (
            <NotZeroCustom
              key={it.id}
              content={it.content}
              cosId={it.id}
              category={it.category}
              id={id}
              setCusDelete={setCusDelete}
              cusDelete={cusDelete}
              setCusSubmit={setCusSubmit}
              cusSubmit={cusSubmit}
            ></NotZeroCustom>
          ))}
        </div>
      ) : (
        <ZeroCustom />
      )}

      <div className={styles.plusP}>
        <i
          className={"fa-solid fa-circle-plus"}
          onClick={() => {
            openCreateModal();
          }}
        ></i>
      </div>
      <CustomModal open={createModal} close={closeCreateModal} header="Modal heading" setcusModal={cusModalT}></CustomModal>
    </div>
  );
};

export default DailyCustomMissionList;
