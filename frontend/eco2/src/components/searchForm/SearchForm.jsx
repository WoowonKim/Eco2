import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./SearchForm.module.css";

const SearchForm = ({ type, onSearch }) => {
  const [search, setSearch] = useState("");

  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleSearch = () => {
    const value = inputRef.current.value;
    onSearch(value);
  };

  // const onChange = (e) => {
  //   setSearch(e.target.value);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (type === "notice") {
      handleSearch();
    }
    // 친구 조회 로직
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    // 친구 조회 로직
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
