import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import styles from "./Leaf.module.css";

const style = {
  position: "absolute",
  cursor: "move",
  height: "40px",
};
export const Leaf = ({ id, left, top, category, delay, createdItem }) => {
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
  let preview = useRef();
  const setPreviewMouse = (e) => {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    preview.current.style.left =
      mouseX - preview.current.offsetWidth / 2 + "px";
    preview.current.style.top =
      mouseY - preview.current.offsetHeight / 2 + "px";
  };
  const setPreviewTouch = (e) => {
    const mouseX = e.touches[0].clientX;
    const mouseY = e.touches[0].clientY;
    preview.current.style.left =
      mouseX - preview.current.offsetWidth / 2 + "px";
    preview.current.style.top =
      mouseY - preview.current.offsetHeight / 2 + "px";
  };
  useEffect(() => {
    if (preview && isDragging) {
      document.addEventListener("mousemove", setPreviewMouse);
      document.addEventListener("touchmove", setPreviewTouch);
    }
    return () => {
      document.removeEventListener("mousemove", setPreviewMouse);
      document.removeEventListener("touchmove", setPreviewTouch);
    };
  }, [isDragging]);
  return isDragging ? (
    <img
      src={
        process.env.PUBLIC_URL + "/tree_leaves/" + "Leaf" + category + ".png"
      }
      className={styles.preview}
      ref={preview}
    ></img>
  ) : (
    <img
      className={` ${
        category <= 6
          ? createdItem !== id
            ? styles.leaf
            : styles.createdItem
          : styles.item
      } `}
      src={
        process.env.PUBLIC_URL + "/tree_leaves/" + "Leaf" + category + ".png"
      }
      ref={drag}
      style={{ ...style, left, top, animationDelay: delay }}
      data-testid="leaf"
      alt="leaf"
    ></img>
  );
};
