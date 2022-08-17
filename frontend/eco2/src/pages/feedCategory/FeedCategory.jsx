import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./FeedCategory.module.css";
import FeedList from "../../components/feed/feedList/FeedList";
import { useDispatch } from "react-redux";
import { postList } from "../../store/post/postSlice";

const FeedCategory = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [feeds, setFeeds] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postList()).then((res) => {
      console.log(res);
      if (res.payload?.status === 200) {
        setFeeds(res.payload.postListDtos);
        console.log(res.payload.postListDtos);
      }
    });
  }, [likeCount]);

  return (
    <div className={styles.container}>
      {!!feeds && <FeedList category={location.state?.category} display={"grid"} feeds={feeds} setLikeCount={setLikeCount} />}
    </div>
  );
};

export default FeedCategory;
