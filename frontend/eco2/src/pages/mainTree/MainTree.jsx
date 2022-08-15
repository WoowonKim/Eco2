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
        console.log(res.payload);
        setStatistic(res.payload.statistic);
      }
    });
  }, []);
  return (
    <div className={styles.Tree} ref={drop}>
      <img
        src={process.env.PUBLIC_URL + "tree_leaves/tree6.png"}
        className={styles.Img} 
        draggable="false"
      ></img>
      <img
        className={styles.windImg}
        src={process.env.PUBLIC_URL + "tree_leaves/wind.png"}
      ></img>
      <img
        className={styles.windImg2}
        src={process.env.PUBLIC_URL + "tree_leaves/wind.png"}
      ></img>
            <img
        className={styles.windImg3}
        src={process.env.PUBLIC_URL + "tree_leaves/wind.png"}
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
        <div>
        <img
      className={styles.leaf}
      src={
        process.env.PUBLIC_URL + "/tree_leaves/Leaf1.png"}
    ></img>실천{" "}{statistic.category1}회
        </div>
        <div>
        <img
      className={styles.leaf}
      src={
        process.env.PUBLIC_URL + "/tree_leaves/Leaf2.png"}
    ></img>사용 {statistic.category2}
          회
        </div>
        <div>
        <img
      className={styles.leaf}
      src={
        process.env.PUBLIC_URL + "/tree_leaves/Leaf3.png"}
    ></img>절약{" "}
          {statistic.category3}회
        </div>
        <div>
        <img
      className={styles.leaf}
      src={
        process.env.PUBLIC_URL + "/tree_leaves/Leaf4.png"}
    ></img>구매{" "}
          {statistic.category4}회
        </div>
        <div>
        <img
      className={styles.leaf}
      src={
        process.env.PUBLIC_URL + "/tree_leaves/Leaf5.png"}
    ></img>재활용 {statistic.category5}회
        </div>
      </div>
    </div>
  );
};

export default MainTree;
