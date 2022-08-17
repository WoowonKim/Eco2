import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsNew } from "../../store/alarm/alarmSlice";
import AlarmPopUpContainer from "../alarm/alarmPopUpContainer/AlarmPopUpContainer";
import styles from "./Footer.module.css";

const Footer = () => {
  const [active, setActive] = useState("");
  let navigate = useNavigate();
  const isNew = useSelector(selectIsNew);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("mainTree")) {
      setActive("mainTree");
    } else if (location.pathname.includes("dailymissionmain")) {
      setActive("dailymissionmain");
    } else if (location.pathname.includes("mainFeed")) {
      setActive("mainFeed");
    } else if (location.pathname.includes("quest")) {
      setActive("quest");
    } else if (location.pathname.includes("alarm")) {
      setActive("alarm");
    }
  });

  return (
    <footer className={styles.Footer}>
      <AlarmPopUpContainer />
      <i
        className={`fa-solid fa-tree ${styles.icon} ${active === "mainTree" ? styles.active : null}`}
        onClick={() => {
          navigate("/mainTree");
        }}
      ></i>
      <i
        className={`fa-solid fa-envelope-open-text ${styles.icon} ${active === "dailymissionmain" ? styles.active : null}`}
        onClick={() => {
          navigate("/dailymissionmain");
        }}
      ></i>
      <i
        className={`fa-solid fa-earth-americas ${styles.icon} ${active === "mainFeed" ? styles.active : null}`}
        onClick={() => {
          navigate("/mainFeed");
        }}
      ></i>
      <i
        className={`fa-solid fa-map-location-dot ${styles.icon} ${active === "quest" ? styles.active : null}`}
        onClick={() => {
          navigate("/quest");
        }}
      ></i>
      <i
        className={`fa-solid fa-bullhorn ${styles.icon} ${active === "alarm" ? styles.active : null}`}
        onClick={() => {
          navigate("/alarm");
        }}
      >
        {isNew && <div className={styles.newbadge}></div>}
      </i>
    </footer>
  );
};

export default Footer;
