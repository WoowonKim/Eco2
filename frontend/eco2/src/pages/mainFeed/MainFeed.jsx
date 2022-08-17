import React, { useEffect, useState } from "react";
import styles from "./MainFeed.module.css";
import { Link } from "react-router-dom";

const MainFeed = () => {
  useEffect(() => {
    document.getElementById("scroll-container").scrollTop = 0;
  }, []);
  return (
    <div className={styles.mainFeed}>
      <div className={styles.session1}>
        <Link to={`/mainFeed/${"do"}`} state={{ category: 1 }}>
          <div className={styles.do1}>
            <div className={styles.do1Title}>
              <i className={`fa-solid fa-person-walking fa-1x`}></i>
              <span> 실천하기</span>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.session2}>
        <Link to={`/mainFeed/${"use"}`} state={{ category: 2 }}>
          <div className={styles.do2}>
            <div className={styles.do2Title}>
              <i className={`fa-solid fa-cookie-bite fa-1x`}> </i>
              <span> 사용하기</span>
            </div>
          </div>
        </Link>
        <Link to={`/mainFeed/${"save"}`} state={{ category: 3 }}>
          <div className={styles.do3}>
            <div className={styles.do3Title}>
              <i className={`fa-solid fa-cookie-bite fa-1x`}> </i>
              <span> 절약하기</span>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.session3}>
        <Link to={`/mainFeed/${"buy"}`} state={{ category: 4 }}>
          <div className={styles.do4}>
            <div className={styles.do4Title}>
              <i className={`fa-solid fa-cookie-bite fa-1x`}> </i>
              <span> 구매하기</span>
            </div>
          </div>
        </Link>
        <Link to={`/mainFeed/${"recycle"}`} state={{ category: 5 }}>
          <div className={styles.do5}>
            <div className={styles.do5Title}>
              <i className={`fa-solid fa-cookie-bite fa-1x`}> </i>
              <span> 재활용하기</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainFeed;
