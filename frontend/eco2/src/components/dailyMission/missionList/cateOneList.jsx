import React from "react";
import CateOne from "../missionItem/cateOne";
const CateOneList = ({ id, categoryOne, setCateNum, onCreate, cnt, setCnt, faAdd, setFaAdd }) => {
  // console.log("cate==>", categoryOne);
  return (
    <div>
      <p
        onClick={() => {
          setCateNum(0);
        }}
      >
        돌아가기
      </p>
      <div>
        {categoryOne.map((it) => (
          <CateOne
            key={it.id}
            content={it.title}
            ecoId={it.id}
            onCreate={onCreate}
            id={id}
            cnt={cnt}
            setCnt={setCnt}
            faAdd={faAdd}
            setFaAdd={setFaAdd}
            setCateNum={setCateNum}
            category={it.category}
          />
        ))}
      </div>
    </div>
  );
};

export default CateOneList;
