import { useDrag } from "react-dnd";
import styles from "./Leaf.module.css";

const style = {
  position: "absolute",
  cursor: "move",
  height: "40px",
};
export const Leaf = ({ id, left, top, category }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "leaf",
      item: { id, left, top, category },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, category]
  );
  if (isDragging) {
    return <img ref={drag} />;
  }
  return (
    <img
      className={styles.leaf}
      src={
        process.env.PUBLIC_URL + "/tree_leaves/" + "Leaf" + category + ".png"
      }
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="leaf"
    ></img>
  );
};
