import React from 'react';
import FeedList from '../../components/feedList/FeedList';
import styles from './MainFeed.module.css'

const MainFeed = () => {
  return (
    <div>
      <h2 className={styles.title}>실천하기</h2>
      <div className={styles.container}>
        <FeedList 
          category={'do'}
        />
      </div>
      <h2 className={styles.title}>사용하기</h2>
      <div className={styles.container}>
        <FeedList 
          category={'use'}
        />
      </div>
      <h2 className={styles.title}>절약하기</h2>
      <div className={styles.container}>
        <FeedList 
          category={'save'}
        />
      </div>
      <h2 className={styles.title}>구매하기</h2>
      <div className={styles.container}>
        <FeedList 
          category={'buy'}
        />
      </div>
      <h2 className={styles.title}>재활용하기</h2>
      <div className={styles.container}>
        <FeedList 
          category={'recycle'}
        />
      </div>
    </div>
  );
};

export default MainFeed;