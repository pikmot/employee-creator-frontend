import React from "react";

import classes from "./Dropdown.module.scss";

interface DropdownProps {
  setPageSize: (size: number) => void;
  setCurrentPage: (pageNumber: number) => void;
}

export default function Dropdown({
  setPageSize,
  setCurrentPage,
}: DropdownProps) {
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <select
      id="dropDown"
      className={classes.dropDown}
      onChange={handlePageSizeChange}
    >
      <option value={5}> 5</option>
      <option value={10}> 10</option>
      <option value={15}> 15</option>
      <option value={20}> 20</option>
      <option value={30}> 30</option>
    </select>
  );
}
