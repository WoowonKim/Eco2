import React from 'react';
import FeedList from '../../components/feedList/FeedList';
import styles from './MainFeed.module.css'
import { Link } from 'react-router-dom'

const MainFeed = () => {
  return (
    <div>
      <div>
        <div className={styles.title}>
          <h2 className={styles.text}>실천하기</h2>
          <Link to={`/mainFeed/${'do'}`} className={styles.link}>
            <i className="fa-solid fa-circle-plus"></i> 더보기
          </Link>
        </div>
        <div className={styles.container}>
          <FeedList 
            category={'do'}
            display={'list'}
          />
        </div>
      </div>
      <div>
        <div className={styles.title}>
          <h2 className={styles.text}>사용하기</h2>
          <Link to={`/mainFeed/${'use'}`} className={styles.link}>
            <i className="fa-solid fa-circle-plus"></i> 더보기
          </Link>
        </div>
        <div className={styles.container}>
          <FeedList 
            category={'use'}
            display={'list'}
          />
        </div>
      </div>
      <div>
        <div className={styles.title}>
          <h2 className={styles.text}>절약하기</h2>
          <Link to={`/mainFeed/${'save'}`} className={styles.link}>
            <i className="fa-solid fa-circle-plus"></i> 더보기
          </Link>
        </div>
        <div className={styles.container}>
          <FeedList 
            category={'save'}
            display={'list'}
          />
        </div>
      </div>
      <div>
        <div className={styles.title}>
          <h2 className={styles.text}>구매하기</h2>
          <Link to={`/mainFeed/${'buy'}`} className={styles.link}>
            <i className="fa-solid fa-circle-plus"></i> 더보기
          </Link>
        </div>
        <div className={styles.container}>
          <FeedList 
            category={'buy'}
            display={'list'}
          />
        </div>
      </div>
      <div>
        <div className={styles.title}>
          <h2 className={styles.text}>재활용하기</h2>
          <Link to={`/mainFeed/${'recycle'}`} className={styles.link}>
            <i className="fa-solid fa-circle-plus"></i> 더보기
          </Link>
        </div>
        <div className={styles.container}>
          <FeedList 
            category={'recycle'}
            display={'list'}
          />
        </div>
      </div>
      
    </div>
  );
};

export default MainFeed;