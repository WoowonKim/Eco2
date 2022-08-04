import React from "react";
import { useParams } from "react-router-dom";
import styles from "./FeedCategory.module.css";
import FeedList from "../../components/feed/feedList/FeedList";

const FeedCategory = () => {
  const params = useParams();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>카테고리 {params.feedCategory}</h1>
      <FeedList category={params.feedCategory} display={"grid"} />
    </div>
  );
};

export default FeedCategory;
