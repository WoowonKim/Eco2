import React, { useState, useEffect } from "react";
import styles from "./dailyMissionDetail.module.css";
import { customMission } from "../../../store/mission/customMissionSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { customDeleteMission } from "../../../store/mission/customMissionSlice";
import { postMission } from "../../../store/mission/missionMainSlice";
import ZeroCustom from "./zeroCustom";
import NotZeroCustom from "./notZeroCustom";
import CustomModal from "../../modal/customModal/customModal";

const DailyCustomMissionList = ({ id }) => {
  const [cos, setCos] = useState([]);
  const customList = useSelector(state => state.custom);
  const [cusMi, setCusMi] = useState([]);

  const [cusDelete, setCusDelete] = useState(false);
  const [cusSubmit, setCusSubmit] = useState(false);
  const [cusModal, setcusModal] = useState(false);

  const dispatch = useDispatch();
  const naviGate = useNavigate();

  useEffect(() => {
    dispatch(customMission({ id })).then(res => {
      setCos(res.payload.customMissionList);
    });
  }, [cusSubmit, cusDelete, cusModal]);

  const onDelete = deleteId => {
    if (window.confirm("커스텀 미션을 삭제하시겠습니까?")) {
      dispatch(customDeleteMission({ id: deleteId })).then(res => {
        setCusDelete(!cusDelete);
        console.log("삭제 ===>", deleteId);
      });
      alert("삭제 완료!");
    } else {
      alert("더 좋은 미션들을 만들어 보아요 :)");
    }
  };

  const onCusMission = (id, postId) => {
    if (window.confirm("데일리 미션으로 옮기시겠어요?")) {
      cusMi.push(postId);
      dispatch(postMission({ id, customMissionList: cusMi })).then(res => {
        setCusSubmit(!cusSubmit);
        console.log("등록 ===>", postId);
      });
      alert(`이동완료!\n삭제버튼을 누를 경우 다시 목록에 추가됩니다!`);
    }
  };

  const [createModal, setCreateModal] = useState(false);
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
          {cos.map(it => (
            <NotZeroCustom
              key={it.id}
              content={it.content}
              cosId={it.id}
              onDelete={onDelete}
              onCusMission={onCusMission}
              id={id}
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
      <CustomModal
        open={createModal}
        close={closeCreateModal}
        header="Modal heading"
        setcusModal={cusModalT}
      ></CustomModal>
    </div>
  );
};

export default DailyCustomMissionList;
