import React from "react";

import classes from "./Dropdown.module.scss";

export default function Dropdown() {
  return (
    <select className={classes.dropDown}>
      <option> 5</option>
      <option> 10</option>
      <option> 15</option>
      <option> 20</option>
      <option> 30</option>
    </select>
  );
}
