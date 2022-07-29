import styles from "./MainTree.module.css";
import { Leaf } from "./Leaf.jsx";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
const MainTree = () => {
  const [leaves, setLeaves] = useState({
    a: { top: 20, left: 80, category: 3 },
    b: { top: 180, left: 20, category: 4 },
  });

  const moveLeaf = useCallback(
    (id, left, top) => {
      setLeaves(
        update(leaves, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [leaves, setLeaves]
  );
  const [, drop] = useDrop(
    () => ({
      accept: "leaf",
      drop(item, monitor) {
        console.log(item);
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        console.log(left);
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
      ></img>
      {Object.keys(leaves).map((key) => {
        console.log(key);
        const { left, top, category } = leaves[key];
        return (
          <Leaf
            key={key}
            id={key}
            left={left}
            top={top}
            //김우우너 바보멍청ㅇ;
          ></Leaf>
        );
      })}
    </div>
  );
};

export default MainTree;
