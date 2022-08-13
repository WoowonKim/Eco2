import styles from "./MainTree.module.css";
import { Leaf } from "./Leaf.jsx";
import { useEffect, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  changePos,
  getLeaves,
  statisticLeaves,
  updateLeaf,
} from "../../store/mainTree/leavesSlice";
import { getUserId } from "../../store/user/common";
const MainTree = () => {
  let dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves);
  let currUser = useSelector((state) => state.user.user);
  let categoryCounts = useMemo(() => {
    const categoryCounts = [0, 0, 0, 0, 0, 0];
    for (let i in leaves.data) {
      categoryCounts[leaves.data[i].category - 1]++;
    }
    return categoryCounts;
  }, [leaves]);
  useEffect(() => {
    console.log(currUser);
    dispatch(getLeaves(getUserId()));
  }, []);
  const moveLeaf = (id, left, top) => {
    dispatch(changePos({ id, left, top }));
    dispatch(updateLeaf({ userId: getUserId(), leaf: { id, left, top } }));
  };
  const [, drop] = useDrop(
    () => ({
      accept: "leaf",
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveLeaf(item.id, left, top);
        return undefined;
      },
    }),
    [moveLeaf]
  );
  const [statistic, setStatistic] = useState([]);
  useEffect(() => {
    dispatch(statisticLeaves({ userId: getUserId() })).then((res) => {
      if (res.payload?.status === 200) {
        setStatistic(res.payload.statistic);
      }
    });
  }, []);
  return (
    <div className={styles.Tree} ref={drop}>
      <img
        src={process.env.PUBLIC_URL + "tree_leaves/mainBrownTree.png"}
        className={styles.Img}
        draggable="false"
      ></img>
      {leaves.data.map((leaf) => {
        const { id, left, top, category } = leaf;
        return (
          <Leaf
            key={id}
            id={id}
            left={left}
            top={top}
            category={category}
          ></Leaf>
        );
      })}
      <div className={styles.Statis}>
        <p>
          <i className="fa-solid fa-person-walking"></i>실천{" "}
          {statistic.category1}회
        </p>
        <p>
          <i className="fa-solid fa-cookie-bite"></i>사용 {statistic.category2}
          회
        </p>
        <p>
          <i className="fa-solid fa-arrows-down-to-line"></i>절약{" "}
          {statistic.category3}회
        </p>
        <p>
          <i className="fa-solid fa-basket-shopping"></i>구매{" "}
          {statistic.category4}회
        </p>
        <p>
          <i className="fa-solid fa-recycle"></i>재활용 {statistic.category5}회
        </p>
        <p>
          <i className="fa-solid fa-clover"></i>기타 {statistic.category6}회
        </p>
      </div>
    </div>
  );
};

export default MainTree;
