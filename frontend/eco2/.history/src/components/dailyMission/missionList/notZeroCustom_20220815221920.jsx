import React from "react";

const NotZeroCustom = ({
  content,
  cosId,
  onDelete,
  onCusMission,
  id,
  category,
}) => {
  return (
    <div>
      <div>
        <img
          src={process.env.PUBLIC_URL + `/tree_leaves/Leaf${category}.png`}
          // className={styles.leafSize}
        ></img>
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
