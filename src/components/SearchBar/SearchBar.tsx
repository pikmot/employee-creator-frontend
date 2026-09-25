import React from "react";

import classes from "./SearchBar.module.scss";

interface SearchBarProps {
  setSearchTerm: (word: string) => void;
  setCurrentPage: (page: number) => void;
}

export default function SearchBar({
  setSearchTerm,
  setCurrentPage,
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);

    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <form>
      <input
        className={classes.searchBar}
        onChange={handleChange}
        placeholder="Enter Any Name"
      ></input>
    </form>
  );
}
