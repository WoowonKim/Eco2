import React from "react";
import { Link } from "react-router-dom";

const missionDetail = () => {
  /* 더미객체  */
  const DummyDailyMission = [
    {
      id: 1,
      content: "텀블러 사용해서 지구 지키기",
    },
    {
      id: 2,
      content: "밖에 나갈때 멀티탭 뽑기",
    },
    {
      id: 3,
      content: "더운날 찬물 샤워 해보기",
    },
  ];
  return (
    <div>
      <div>
        <p>오늘은 어떤 도전을 해볼까?</p>
      </div>
      <div>
        <h3>텀블러 사용해서 지구 지키기</h3>
      </div>
    </div>
  );
};

export default missionDetail;
