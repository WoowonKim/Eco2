import React from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addComment } from '../../store/mainFeed/commentSlice';
import styles from './CommentForm.module.css'

const CommentForm = ({ postId, content}) => {
  const [value, setValue] = useState("")
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addComment({ postId:postId, content:value }))
    setValue('')
  }
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input 
        value={content ? content : value} 
        type="text" 
        onChange={(e) => setValue(e.target.value)} 
        className={styles.input}
      />
      <button className={styles.button} type="submit">작성</button>
    </form>
  );
};

export default CommentForm;