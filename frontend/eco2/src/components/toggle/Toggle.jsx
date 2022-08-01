import React, { useState } from "react";
import styles from "./Toggle.module.css";

const Toggle = ({ type, isChecked }) => {
  const displayType = isChecked ? styles.checked : null;
  return (
    <div className={styles.toggle}>
      <input
        type="checkbox"
        id={type}
        hidden
        className={`${displayType} ${styles.toggle}`}
        defaultChecked={isChecked}
      />
      <label htmlFor={type} className={styles.toggleSwitch}>
        <span className={styles.toggleButton}></span>
      </label>
    </div>
  );
};

export default Toggle;
