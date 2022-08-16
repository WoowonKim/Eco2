import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FeedItem from "../feedItem/FeedItem";
import styles from "./FeedList.module.css";

const FeedList = ({ category, display, feeds, setLikeCount }) => {
  const displayType = display === "list" ? styles.list : styles.grid;
  const location = useLocation();
  return (
    <div className={styles.container}>
      <div className={displayType}>
        {!!feeds ? (
          feeds.map(
            (feed) =>
              (category === feed.mission?.category ||
                category === feed.customMission?.category ||
                category === feed.quest?.mission.category) && (
                // feed.postPublicFlag &&
                <FeedItem
                  key={feed.id}
                  id={feed.id}
                  userId={feed.userId}
                  userName={feed.userName}
                  category={
                    feed.quest?.category ||
                    feed.mission?.category ||
                    feed.customMission?.category
                  }
                  content={feed.content}
                  like={feed.likeCount}
                  userEmail={feed.userEmail}
                  likeUsers={feed?.postLikeUserIds}
                  setLikeCount={setLikeCount}
                />
              )
          )
        ) : (
          <div className={styles.box}></div>
        )}
      </div>
    </div>
  );
};

export default FeedList;
