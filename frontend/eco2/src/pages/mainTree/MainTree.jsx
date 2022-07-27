import styles from "./MainTree.module.css";
import { Leaf } from "../../components/styled";
import { useSelector, useDispatch } from "react-redux";
import { leavesAction } from "../../store/mainTree/leavesSlice";
const MainTree = () => {
  let dispatch = useDispatch();
  let leaves = useSelector((state) => state.leaves);
  const mouseDownHandler = (e, i, leaf) => {
    let copy = [...leaves];
    copy[i].left = "300px";
    dispatch(leavesAction.changePos(copy));
  };
  return (
    <div className={styles.Tree}>
      <img
        src={process.env.PUBLIC_URL + "tree_leaves/mainTree.png"}
        className={styles.Tree}
      ></img>
      {leaves.map(function (leaf, i) {
        return (
          <Leaf
            key={i}
            src={process.env.PUBLIC_URL + "tree_leaves/Leaf" + leaf.id + ".png"}
            left={leaf.left}
            top={leaf.top}
            onMouseDown={(e) => {
              mouseDownHandler(e, i, leaf);
            }}
            //김우우너 바보멍청ㅇ;
          ></Leaf>
        );
      })}
    </div>
  );
};

export default MainTree;
