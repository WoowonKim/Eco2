import React from "react";
import { useNavigate } from "react-router-dom";
import AlarmPopUpContainer from "../alarm/alarmPopUpContainer/AlarmPopUpContainer";
import styles from "./Footer.module.css";

const Footer = () => {
  let navigate = useNavigate();
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
        <i
          className="fa-solid fa-bullhorn"
          onClick={() => {
            navigate("/alarm");
          }}
        ></i>
      </footer>
    </>
  );
};

export default Footer;
