import styles from "./MainTree.module.css";
const MainTree = () => {
  return (
    <div className={styles.Tree}>
      <img
        src={process.env.PUBLIC_URL + "tree_leaves/mainTree.png"}
        className={styles.Tree}
      ></img>
    </div>
  );
};

export default MainTree;
