import React from "react";

const MissionMain = ({ id, content }) => {
  return (
    <div>
      <div>
        <input type={"checkbox"}></input>
        <span>{content}</span>
        <i className="fa-solid fa-trash-can"></i>
      </div>
    </div>
  );
};

export default MissionMain;
