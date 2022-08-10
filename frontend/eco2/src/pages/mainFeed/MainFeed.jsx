import React, { useEffect, useState } from "react";
import FeedList from "../../components/feed/feedList/FeedList";
import styles from "./MainFeed.module.css";
import { Link } from "react-router-dom";
import { postList } from "../../store/post/postSlice";
import { useDispatch } from "react-redux";

const MainFeed = () => {
  const [feeds, setFeeds] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postList()).then((res) => {
      console.log(res);
      if (res.payload?.status === 200) {
        setFeeds(res.payload.postListDtos);
      }
    });
  }, []);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>실천하기</h2>
          <Link
            to={`/mainFeed/${"do"}`}
            className={styles.link}
            state={{ category: 1, feeds }}
          >
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={1} display={"list"} feeds={feeds} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>사용하기</h2>
          <Link
            to={`/mainFeed/${"use"}`}
            className={styles.link}
            state={{ category: 2 }}
          >
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={2} display={"list"} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>절약하기</h2>
          <Link
            to={`/mainFeed/${"save"}`}
            className={styles.link}
            state={{ category: 3 }}
          >
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={3} display={"list"} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>구매하기</h2>
          <Link
            to={`/mainFeed/${"buy"}`}
            className={styles.link}
            state={{ category: 4 }}
          >
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={4} display={"list"} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2 className={styles.text}>재활용하기</h2>
          <Link
            to={`/mainFeed/${"recycle"}`}
            className={styles.link}
            state={{ category: 5 }}
          >
            <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}
            더보기
          </Link>
        </div>
        <div className={styles.list}>
          <FeedList category={5} display={"list"} />
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
