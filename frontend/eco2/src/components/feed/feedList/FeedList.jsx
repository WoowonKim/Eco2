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
              (category === feed.mission?.category ||
                category === feed.customMission?.category) &&
              feed.publicFlag && (
                <FeedItem
                  key={feed.id}
                  id={feed.id}
                  userId={feed.userId}
                  userName={feed.userName}
                  category={
                    feed.mission?.category || feed.customMission?.category
                  }
                  content={feed.content}
                  like={feed.like}
                  userEmail={feed.userEmail}
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
