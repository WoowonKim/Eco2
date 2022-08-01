import React, { useState } from "react";
import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 친구 조회 로직
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      // 친구 조회 로직
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          onKeyPress={onKeyPress}
          onChange={onChange}
          type="text"
          className={styles.input}
          placeholder="Search"
        />
      </form>
    </div>
  );
};

export default SearchForm;
