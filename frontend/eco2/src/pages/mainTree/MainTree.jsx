import styles from "./MainTree.module.css";
import { Leaf } from "./Leaf.jsx";
import { useEffect, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { changePos, getLeaves, statisticLeaves, updateLeaf } from "../../store/mainTree/leavesSlice";
import { getUserId } from "../../store/user/common";
import { setCreatedToNull } from "../../store/post/postSlice";
const MainTree = () => {
  let dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves);
  let createdItem = useSelector((state) => state.post.createdItem);
  useEffect(() => {
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
        dispatch(setCreatedToNull());
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
    return () => {
      dispatch(setCreatedToNull());
    };
  }, []);
  return (
    <div className={styles.Tree} ref={drop}>
      <img src={process.env.PUBLIC_URL + "tree_leaves/tree6.png"} className={styles.Img} draggable="false"></img>
      <img className={styles.windImg} src={process.env.PUBLIC_URL + "tree_leaves/wind.png"}></img>
      <img className={styles.windImg2} src={process.env.PUBLIC_URL + "tree_leaves/wind.png"}></img>
      <img className={styles.windImg3} src={process.env.PUBLIC_URL + "tree_leaves/wind.png"}></img>
      {leaves.data.map((leaf) => {
        const { id, left, top, category } = leaf;
        let delay = Math.random() * 2;
        delay *= 10;
        delay = Math.floor(delay);
        delay /= 10;
        console.log(id, createdItem);
        if (id === createdItem) {
          delay = 0;
        }
        return <Leaf key={id} id={id} left={left} top={top} category={category} delay={delay + "s"} createdItem={createdItem}></Leaf>;
      })}
      <div className={styles.Statis}>
        <div>
          <img className={styles.leaf} src={process.env.PUBLIC_URL + "/tree_leaves/Leaf1.png"}></img>
          실천 {statistic.category1}회
        </div>
        <div>
          <img className={styles.leaf} src={process.env.PUBLIC_URL + "/tree_leaves/Leaf2.png"}></img>
          사용 {statistic.category2}회
        </div>
        <div>
          <img className={styles.leaf} src={process.env.PUBLIC_URL + "/tree_leaves/Leaf3.png"}></img>
          절약 {statistic.category3}회
        </div>
        <div>
          <img className={styles.leaf} src={process.env.PUBLIC_URL + "/tree_leaves/Leaf4.png"}></img>
          구매 {statistic.category4}회
        </div>
        <div>
          <img className={styles.leaf} src={process.env.PUBLIC_URL + "/tree_leaves/Leaf5.png"}></img>
          재활용 {statistic.category5}회
        </div>
      </div>
    </div>
  );
};

export default MainTree;
