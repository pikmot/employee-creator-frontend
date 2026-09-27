import React from "react";

import classes from "./Spinner.module.scss";

import spinAnim from "../../assets/icons/arrows-rotate-solid-full.svg";

export default function Spinner() {
  return <img src={spinAnim} className={classes.spinner} />;
}
