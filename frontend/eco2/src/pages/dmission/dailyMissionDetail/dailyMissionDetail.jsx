//React
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";

// Store
import { dMission } from "../../../store/mission/dailymissionSlice";
import { getUserId } from "../../../store/user/common";

// Components
import DailyEcoMissionList from "../../../components/dailyMission/missionList/dailyEcoMissionList";
import { useLocation } from "react-router-dom";

const DailyMissionDetail = () => {
  const [missionList, setMissionList] = useState([]); // 서버에서 미션리스트를 불러오기 위한 State
  const [id, setId] = useState(getUserId()); // user id를 갖고 오기 위한 State
  const [test, setTest] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  // const [test, setTest] = useState(true);
  /**
   * getUserId() : id를 불러오기 위한 함수
   * dMission() : 서버에서 미션을 갖고 오기 위한 함수
   */
  useEffect(() => {
    setId(getUserId());
    dispatch(dMission({ id: getUserId() })).then((res) => setMissionList(res.payload.missionList));
  }, []);

  // if (!location.state?.list) {
  //   setTest(false);
  // }
  const customMake = location.state?.list;
  //onsole.log("넘어오는 값 ===>", customMake);
  return (
    <div>
      <DailyEcoMissionList id={id} ecomissionList={missionList} customMake={customMake} />
    </div>
  );
};

export default DailyMissionDetail;
