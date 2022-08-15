import React, { useEffect, useState } from "react";
import styles from "./PostModal.module.css";
import { useDispatch } from "react-redux";
import { customDeleteMission } from "../../../store/mission/customMissionSlice";

const PostzeroModal = () => {
  return <div></div>;
};

export default PostzeroModal;

// const onDelete = deleteId => {
//     if (window.confirm("커스텀 미션을 삭제하시겠습니까?")) {
//       dispatch(customDeleteMission({ id: deleteId })).then(res => {
//         setCusDelete(!cusDelete);
//         console.log("삭제 ===>", deleteId);
//       });
//       alert("삭제 완료!");
//     } else {
//       alert("더 좋은 미션들을 만들어 보아요 :)");
//     }
//   };
