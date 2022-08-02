import React from "react";
import styles from "./dailyMissionDetail.module.css";
import { GreenBtn } from "../../styled";

const DailyCustomMissionList = () => {
  return (
    <div>
      <h2>커스텀 미션이 없습니다.</h2>
      <h4>아래 버튼을 눌러 생성해보세요!</h4>
      <div className={styles.plusP}>
        <i
          className={"fa-solid fa-circle-plus"}
          onClick={() => {
            alert("모달창");
          }}
        ></i>
      </div>
      <div>
        <GreenBtn> 선택한 미션 추가하기</GreenBtn>
      </div>
    </div>
  );
};

export default DailyCustomMissionList;
