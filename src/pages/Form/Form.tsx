import React, { useState } from "react";

import classes from "./Form.module.scss";

import { useNavigate } from "react-router";

export default function Form() {
  const navigate = useNavigate();
  const [onGoing, setOnGoing] = useState(false);

  const handleBack = () => {
    navigate("/");
  };

  const handleCheckBoxClick = () => {
    if (onGoing) setOnGoing(false);
    else setOnGoing(true);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <header className={classes.form__header}>
        <button className={classes.form__header__button} onClick={handleBack}>
          BACK
        </button>
        <h1>Add New Employee</h1>
      </header>

      <form className={classes.form} onSubmit={handleSubmit}>
        <h1>Personal Information</h1>
        <div className={classes.form__container}>
          <label htmlFor="firstname">First Name</label>
          <input id="firstname" type="text"></input>

          <label htmlFor="middlename">Middle Name</label>
          <input id="middlename" type="text"></input>

          <label htmlFor="lastname">Last Name</label>
          <input id="lastname" type="text"></input>
        </div>
        <h1>Contact Details</h1>
        <div className={classes.form__container}>
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email"></input>

          <label htmlFor="mobileNumber">Phone Number</label>
          <p className={classes.form__container__subtitle}>
            Must Be An Australian Number
          </p>
          <input id="mobileNumber" type="tel"></input>

          <label htmlFor="address">Residential Address</label>
          <input id="address" type="text"></input>
        </div>
        <h1>Employee Status</h1>
        <div className={classes.form__container}>
          <label>What Is Contract Type?</label>

          <div className={classes["form__radio-container"]}>
            <input id="permanent" type="radio" name="contractType" />
            <label htmlFor="permanent">Permanent </label>
          </div>

          <div className={classes["form__radio-container"]}>
            <input id="contract" type="radio" name="contractType" />
            <label htmlFor="contract">Contract</label>
          </div>

          <label htmlFor="startDate">Start Date</label>
          <input id="startDate" type="date" />

          <label htmlFor="endDate">End Date</label>
          <input id="endDate" type="date" disabled={onGoing} />

          <div className={classes["form__radio-container"]}>
            <label htmlFor="checkBox">On Going</label>
            <input
              id="checkBox"
              type="checkbox"
              onClick={handleCheckBoxClick}
            ></input>
          </div>

          <label>Is This Part-Time Or Full-Time?</label>

          <div className={classes["form__radio-container"]}>
            <input id="partTime" type="radio" name="timeType" />
            <label htmlFor="partTime">Part-Time</label>
          </div>

          <div className={classes["form__radio-container"]}>
            <input id="fullTime" type="radio" name="timeType" />
            <label htmlFor="fullTime">Full-Time</label>
          </div>

          <label htmlFor="hoursPerWeek">Hours Per Week</label>
          <input id="hoursPerWeek" type="number" />
        </div>

        <div className={classes["form__button-container"]}>
          <button>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
