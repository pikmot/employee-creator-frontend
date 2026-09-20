import React, { useEffect, useState } from "react";

import classes from "./PageCounter.module.scss";

interface PageCounterProps {
  page: number;
  setCurrentPage: (page: number) => void;
  finalPage: number;
}

export default function PageCounter({
  page,
  setCurrentPage,
  finalPage,
}: PageCounterProps) {
  const incrementCounter = () => {
    setCurrentPage(page + 1);
  };

  const decrementCounter = () => {
    setCurrentPage(page - 1);
  };

  return (
    <div className={classes.pageCounter}>
      <div className={classes.pageCounter__text}>
        {page}/{finalPage}
      </div>
      <div className={classes.pageCounter__button}>
        <button disabled={page <= 1} onClick={decrementCounter}>
          ←
        </button>
        <button disabled={page >= finalPage} onClick={incrementCounter}>
          →
        </button>
      </div>
    </div>
  );
}
