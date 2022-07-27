import React from "react";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <header className={styles.Header}>
      <div>
        <img
          src={process.env.PUBLIC_URL + "logo.png"}
          className={styles.Img}
        ></img>
        <img
          src={process.env.PUBLIC_URL + "logoText.png"}
          className={styles.Img}
        ></img>
      </div>
      <nav>
        <i className="fa-solid fa-users"></i>
        <i className="fa-solid fa-comments"></i>
      </nav>
    </header>
  );
};

export default Header;
