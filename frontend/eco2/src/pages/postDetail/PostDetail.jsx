import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const feedList = useSelector((state) => state.feed.feedList)
  const params = useParams()
  const feedItem = feedList.find((feed) => feed.id === Number(params.postId))

  return (
    <div>
      <h1>{ feedItem.category }</h1>
      <img src={feedItem.src} alt="" />
      <p>{ feedItem.user }</p>
      <p>{ feedItem.content }</p>
    </div>
  );
};

export default PostDetail;