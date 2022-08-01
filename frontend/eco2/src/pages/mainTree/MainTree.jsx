import styles from "./MainTree.module.css";
import { Leaf } from "./Leaf.jsx";
import { useEffect, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  changePos,
  getLeaves,
  updateLeaf,
} from "../../store/mainTree/leavesSlice";
const MainTree = () => {
  let dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves);
  let currUser = useSelector((state) => state.user);
  let categoryCounts = useMemo(() => {
    const categoryCounts = [0, 0, 0, 0, 0, 0];
    for (let i in leaves.data) {
      categoryCounts[leaves.data[i].category - 1]++;
    }
    return categoryCounts;
  }, [leaves]);
  useEffect(() => {
    dispatch(getLeaves(currUser.id));
  }, []);
  const moveLeaf = (id, left, top) => {
    dispatch(changePos({ id, left, top }));
    dispatch(updateLeaf({ id, left, top }));
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
  return (
    <div className={styles.Tree} ref={drop}>
      <img
        src={process.env.PUBLIC_URL + "tree_leaves/mainTree.png"}
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
        <p>수질 {categoryCounts[0]}회</p>
        <p>토양 {categoryCounts[1]}회</p>
        <p>대기 {categoryCounts[2]}회</p>
        <p>몰라 {categoryCounts[3]}회</p>
        <p>생태계 {categoryCounts[4]}회</p>
        <p>기타 {categoryCounts[5]}회</p>
      </div>
    </div>
  );
};

export default MainTree;
