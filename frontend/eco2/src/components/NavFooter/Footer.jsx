import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsNew } from "../../store/alarm/alarmSlice";
import AlarmPopUpContainer from "../alarm/alarmPopUpContainer/AlarmPopUpContainer";
import styles from "./Footer.module.css";

const Footer = () => {
  let navigate = useNavigate();
  const isNew = useSelector(selectIsNew);
  return (
    <>
      <AlarmPopUpContainer />
      <footer className={styles.Footer}>
        <i
          className="fa-solid fa-tree"
          onClick={() => {
            navigate("/mainTree");
          }}
        ></i>
        <i
          className="fa-solid fa-envelope-open-text"
          onClick={() => {
            navigate("/dailymissionmain");
          }}
        ></i>
        <i
          className="fa-solid fa-earth-americas"
          onClick={() => {
            navigate("/mainFeed");
          }}
        ></i>
        <i
          className="fa-solid fa-map-location-dot"
          onClick={() => {
            navigate("/quest");
          }}
        ></i>
        <div
          onClick={() => {
            navigate("/alarm");
          }}
        >
          {isNew && <div className={styles.btn}></div>}
          <i className="fa-solid fa-bullhorn"></i>
        </div>
      </footer>
    </>
  );
};

export default Footer;
