import React from "react";

const NotZeroCustom = ({ content, cosId, onDelete, onCusMission, id }) => {
  return (
    <div>
      <div>
        <span>{content}</span>
        <button
          onClick={() => {
            onDelete(cosId);
          }}
        >
          삭제
        </button>
        <button
          onClick={() => {
            onCusMission(id, cosId);
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default NotZeroCustom;
