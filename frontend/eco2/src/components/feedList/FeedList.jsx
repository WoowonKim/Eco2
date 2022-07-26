import React from 'react';
import { useSelector } from 'react-redux';
import FeedItem from '../feedItem/FeedItem';
import styles from './FeedList.module.css'

const FeedList = ({ category }) => {

  const feedList = useSelector((state) => state.feed.feedList)
  return (
    <div className={styles.list}>
      <div className={styles.item}>
        {
          feedList.map((feed) => (
            category === feed.category &&
            <FeedItem 
              key={feed.id}
              user={feed.user}
              category={feed.category}
              content={feed.content}
              src={feed.src}
            />
          ))
        }
      </div>
    </div>
  );
};

export default FeedList;