// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import DailyMissionMainitem from "../missionItem/dailyMissonMainitem";
// import { GreenBtn } from "../../styled";
// import styles from "./dailyMission.module.css";
// import { useNavigate } from "react-router-dom";

// const DailyMissionMainList = () => {
//   const ecomissionList = useSelector((state) => state.dailyMission.dailyMissionList);
//   const missionCnt = ecomissionList.length;
//   const naviGate = useNavigate();
//   const [tCnt, setTCnt] = useState(0);

//   const trashCnt = (trash) => {
//     if (!trash) {
//       setTCnt(tCnt + 1);
//     } else {
//       setTCnt(tCnt - 1);
//     }
//   };

//   const onSucsses = () => {
//     if (tCnt === missionCnt) {
//       alert("나뭇잎 획득 메인페이지로 이동합니다.");
//       naviGate("/mainFeed");
//     } else {
//       alert("미션을 완료하고 눌러주세요!");
//     }
//   };

//   return (
//     <div>
//       <div>
//         {ecomissionList.map((it) => (
//           <DailyMissionMainitem key={it.id} content={it.content} id={it.id} trashCnt={trashCnt} />
//         ))}
//       </div>
//       <div className={styles.btn}>
//         <GreenBtn onClick={onSucsses}>오늘 미션 보상 받기</GreenBtn>
//       </div>
//     </div>
//   );
// };

// export default DailyMissionMainList;
