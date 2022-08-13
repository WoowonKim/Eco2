import React, { useEffect, useState } from "react";
import DailyEcoMissionList from "../../../components/dailyMission/missionList/dailyEcoMissionList";
import { dMission } from "../../../store/mission/dailymissionSlice";
import { useDispatch } from "react-redux/es/exports";
import { userInformation } from "../../../store/user/userSettingSlice";
import { getUserEmail } from "../../../store/user/common";

const DailyMissionDetail = () => {
  const [missionList, setMissionList] = useState([]);
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  useEffect(() => {
    dispatch(userInformation({ email: getUserEmail() })).then(res => {
      if (res.payload.status === 200) {
        dispatch(dMission({ id: res.payload.user.id })).then(res =>
          setMissionList(res.payload.missionList)
        );
        setId(res.payload.user.id);
      }
    });
  }, []);
  return (
    <div>
      <DailyEcoMissionList ecomissionList={missionList} id={id} />
    </div>
  );
};

export default DailyMissionDetail;
