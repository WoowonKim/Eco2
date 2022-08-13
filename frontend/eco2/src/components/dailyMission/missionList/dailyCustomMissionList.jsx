import React, { useState, useEffect } from "react";
import styles from "./dailyMissionDetail.module.css";
import { customMission } from "../../../store/mission/customMissionSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { customDeleteMission } from "../../../store/mission/customMissionSlice";
import { postMission } from "../../../store/mission/missionMainSlice";

const DailyCustomMissionList = ({ id }) => {
  const [cos, setCos] = useState([]);
  const customList = useSelector((state) => state.custom);
  const dispatch = useDispatch();
  const naviGate = useNavigate();
  const [list, setList] = useState([]);
  const [cusDelete, setCusDelete] = useState(false);
  const [cusSubmit, setCusSubmit] = useState(false);

  useEffect(() => {
    dispatch(customMission({ id })).then((res) => {
      setCos(res.payload.customMissionList);
    });
  }, [cusSubmit, cusDelete]);

  const onDelete = (deleteId) => {
    if (window.confirm("커스텀 미션을 삭제하시겠습니까?")) {
      dispatch(customDeleteMission({ id: deleteId })).then((res) => {
        setCusDelete(!cusDelete);
      });
      alert("삭제 완료!");
    } else {
      alert("더 좋은 미션들을 만들어 보아요 :)");
    }
  };

  const onCusMission = (postId) => {
    if (window.confirm("데일리 미션으로 옮기시겠어요?")) {
      dispatch(postMission({ id, customMissionList: postId })).then((res) => {
        setCusSubmit(!cusSubmit);
      });
      alert(`이동완료!\n삭제버튼을 누를 경우 다시 목록에 추가됩니다!`);
    }
  };

  // console.log("CustomMissionList ID확인 용도 ===> ", cos);
  return (
    <div>
      {cos.length === 0 ? (
        <div>
          <h2>커스텀 미션이 없습니다.</h2>
          <h4> 아래 버튼을 눌러 생성해보세요!</h4>
        </div>
      ) : (
        <div>
          {cos.map((it) => (
            <div key={it.id}>
              <span>{it.content}</span>
              <button
                onClick={() => {
                  onDelete(it.id);
                }}
              >
                삭제
              </button>
              <button
                onClick={() => {
                  onCusMission([it.id]);
                }}
              >
                저장
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.plusP}>
        <i
          className={"fa-solid fa-circle-plus"}
          onClick={() => {
            if (window.confirm("나만의 미션을 만들겠어요?")) {
              naviGate("/customPlus");
            } else {
              alert("다음에는 미션을 만들어주세요!");
            }
          }}
        ></i>
      </div>
    </div>
  );
};

export default DailyCustomMissionList;
