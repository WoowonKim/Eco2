import React, { useState } from "react";
import styles from "./Toggle.module.css";

const Toggle = ({ type }) => {
  return (
    <div className={styles.toggle}>
      <input type="checkbox" id={type} hidden className={styles.toggle} />
      <label htmlFor={type} className={styles.toggleSwitch}>
        <span className={styles.toggleButton}></span>
      </label>
    </div>
  );
};

export default Toggle;
