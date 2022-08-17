import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./SearchForm.module.css";

const SearchForm = ({ type, onSearch }) => {
  const inputRef = useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          ref={inputRef}
          onKeyPress={onKeyPress}
          type="text"
          className={styles.input}
          placeholder="검색어를 입력해주세요"
        />
      </form>
    </div>
  );
};

export default SearchForm;
