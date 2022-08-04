import React from "react";
import { useSelector } from "react-redux";
import FeedItem from "../feedItem/FeedItem";
import styles from "./FeedList.module.css";

const FeedList = ({ category, display, feeds }) => {
  const displayType = display === "list" ? styles.list : styles.grid;
  return (
    <div className={styles.container}>
      <div className={displayType}>
        {!!feeds ? (
          feeds.map(
            (feed) =>
              category === feed.mission.category && (
                <FeedItem
                  key={feed.id}
                  id={feed.id}
                  userId={feed.userId}
                  userName={feed.userName}
                  category={feed.mission.category}
                  content={feed.content}
                  postImgUrl={feed.postImgUrl}
                  like={feed.like}
                />
              )
          )
        ) : (
          <div>게시물이 존재하지 않습니다.</div>
        )}
      </div>
    </div>
  );
};

export default FeedList;
