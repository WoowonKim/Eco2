import React from 'react';
import { useSelector } from 'react-redux';
import FeedItem from '../feedItem/FeedItem';
import styles from './FeedList.module.css'
import { Link } from 'react-router-dom';

const FeedList = ({ category, display }) => {
  const feedList = useSelector((state) => state.feed.feedList)
  const displayType = display === 'list' ? styles.list : styles.grid
  return (
    <div className={styles.container}>
      <div className={displayType}>
        {
          feedList.map((feed) => (
            category === feed.category &&
            <Link to={`/post/${feed.id}`} className={styles.link}>
              <FeedItem 
                key={feed.id}
                user={feed.user}
                category={feed.category}
                content={feed.content}
                src={feed.src}
              />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default FeedList;