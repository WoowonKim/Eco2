import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../store/mainFeed/commentSlice';
import CommentForm from '../commentForm/CommentForm';
import styles from './CommentItem.module.css'

const CommentItem = ({ id, content, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const handleDelete = () => {
    dispatch(deleteComment({ id }))
  }
  return (
    <div>
      <li className={styles.list}>
        <div>
          <span className={styles.user}>{ user }</span>
          <span className={styles.content}>{ content }</span>
        </div>
        <div>
          <button 
            onClick={() => {setVisible(!visible)}}
            className={styles.editButton}
          >
            { visible ? '숨기기' : '수정' }
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>삭제</button>
        </div>
      </li>
      {
        visible && <CommentForm id={id} content={content} />
      }
    </div>
  );
};

export default CommentItem;