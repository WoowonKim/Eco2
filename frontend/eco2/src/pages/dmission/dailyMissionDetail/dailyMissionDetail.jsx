import React, { useEffect, useState } from "react";
import DailyEcoMissionList from "../../../components/dailyMission/missionList/dailyEcoMissionList";
import { useSelector } from "react-redux/es/exports";
import { dMission } from "../../../store/mission/dailymissionSlice";
import { useDispatch } from "react-redux/es/exports";
import { userInformation } from "../../../store/user/userSettingSlice";
import { getUserEmail } from "../../../store/user/common";

const DailyMissionDetail = () => {
  // const ecomissionList = useSelector((state) => state.dailyMission.dailyMissionList);
  const [test, setTest] = useState([]);
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  useEffect(() => {
    // dispatch(dMission()).then((res) => setTest(res.payload.missionList));
    dispatch(userInformation({ email: getUserEmail() })).then((res) => {
      if (res.payload.status === 200) {
        dispatch(dMission({ id: res.payload.user.id })).then((res) => setTest(res.payload.missionList));
        setId(res.payload.user.id);
      }
    });
  }, []);
  return (
    <div>
      <DailyEcoMissionList ecomissionList={test} id={id} />
      {/* <DailyEcoMissionList id={id} /> */}
    </div>
  );
};

export default DailyMissionDetail;
