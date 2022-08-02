import React, { useEffect, useState } from "react";
import DailyEcoMissionList from "../../../components/dailyMission/missionList/dailyEcoMissionList";
import { useSelector } from "react-redux/es/exports";
import { dMission } from "../../../store/mission/dailymissionSlice";
import { useDispatch } from "react-redux/es/exports";

const DailyMissionDetail = () => {
  // const ecomissionList = useSelector((state) => state.dailyMission.dailyMissionList);
  // 서버미션 테이블 갖고오기.
  const [test, setTest] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dMission()).then((res) => setTest(res.payload.missionList));
  }, []);
  // console.log(test);

  return (
    <div>
      {/* <DailyEcoMissionList ecomissionList={test} /> */}
      <DailyEcoMissionList />
    </div>
  );
};

export default DailyMissionDetail;
