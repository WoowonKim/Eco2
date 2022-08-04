import React, { useEffect, useState } from "react";
import FeedList from "../../components/feed/feedList/FeedList";
import styles from "./MainFeed.module.css";
import { Link } from "react-router-dom";
import { postList } from "../../store/post/postSlice";
import { useDispatch } from "react-redux";

const MainFeed = () => {
  const [feed, setFeed] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postList()).then((res) => {
      if (res.payload.status === 200) {
        setFeed(res.payload.postListDtos);
      }
    });
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>실천하기</h2>
          <Link to={`/mainFeed/${"do"}`} className={styles.link}>
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={"do"} display={"list"} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>사용하기</h2>
          <Link to={`/mainFeed/${"do"}`} className={styles.link}>
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={"use"} display={"list"} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>절약하기</h2>
          <Link to={`/mainFeed/${"do"}`} className={styles.link}>
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={"save"} display={"list"} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>구매하기</h2>
          <Link to={`/mainFeed/${"buy"}`} className={styles.link}>
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={"buy"} display={"list"} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>재활용하기</h2>
          <Link to={`/mainFeed/${"recycle"}`} className={styles.link}>
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={"recycle"} display={"list"} />
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
