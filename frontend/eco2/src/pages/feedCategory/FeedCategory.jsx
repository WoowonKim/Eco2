import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './FeedCategory.module.css'
import FeedList from '../../components/feedList/FeedList';

const FeedCategory = () => {
  const params = useParams();
  
  return (
    <div className={styles.container}>
      <FeedList 
        category={params.feedCategory} 
        display={'grid'}
      />
    </div>
  );
};

export default FeedCategory;