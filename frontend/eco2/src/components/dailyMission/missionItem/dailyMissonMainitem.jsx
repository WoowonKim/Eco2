// import React, { useState, useEffect } from "react";
// import styles from "./dailyMission.module.css";

// const DailyMissonMainitem = ({ id, content, trashCnt }) => {
//   const [trash, setTrash] = useState(true);
//   const trashType = trash ? styles.greenTrash : styles.whiteTrash;

//   const onListRemove = () => {
//     alert(`${id}를 삭제 완료!`);
//   };

//   const onClear = () => {
//     if (window.confirm("미션을 완료 했습니까?")) {
//       if (window.confirm("인증게시글에 글을 작성 하시겠어요?")) {
//         console.log("인증게시글로 이동");
//       } else {
//         console.log("미션 완료!");
//       }
//     } else {
//       console.log("das");
//     }
//   };
//   return (
//     <div className={styles.box}>
//       <input
//         type={"checkbox"}
//         onClick={() => {
//           setTrash(!trash);
//           trashCnt(!trash);
//           onClear();
//         }}
//       ></input>
//       <div>
//         <span>{content}</span>
//       </div>
//       <div>
//         <i className={`${"fa-solid fa-trash-can"} ${trashType}`} onClick={onListRemove}></i>
//       </div>
//     </div>
//   );
// };

// export default DailyMissonMainitem;
