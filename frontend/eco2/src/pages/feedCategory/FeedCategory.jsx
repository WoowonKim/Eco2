import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./FeedCategory.module.css";
import FeedList from "../../components/feed/feedList/FeedList";

const FeedCategory = () => {
  const location = useLocation();
  const params = useParams();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>카테고리 {params.feedCategory}</h1>
      {!!location.state?.feeds ? (
        <FeedList
          category={location.state?.category}
          display={"grid"}
          feeds={location.state?.feeds}
        />
      ) : (
        <div className={styles.text}>게시물이 존재하지 않습니다.</div>
      )}
    </div>
  );
};

export default FeedCategory;
