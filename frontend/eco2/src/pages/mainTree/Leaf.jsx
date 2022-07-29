import { useDrag } from "react-dnd";

const style = {
  position: "absolute",
  cursor: "move",
  height: "40px",
};
export const Leaf = ({ id, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "leaf",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging) {
    return <img ref={drag} />;
  }
  console.log(id);
  return (
    <img
      className="leaf"
      src={process.env.PUBLIC_URL + "/tree_leaves/" + "Leaf" + 1 + ".png"}
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="leaf"
    ></img>
  );
};
