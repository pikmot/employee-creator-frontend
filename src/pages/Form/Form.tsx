import React, { useEffect, useState } from "react";

import classes from "./Form.module.scss";

import { useNavigate } from "react-router";

export default function Form() {
  const navigate = useNavigate();
  const [onGoing, setOnGoing] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    contractType: null as "PERMANENT" | "CONTRACT" | null, //only ever options
    employmentStatus: null as "FULL_TIME" | "PART_TIME" | null,
    startDate: "",
    finishDate: "",
    ongoing: false,
    hoursPerWeek: -1,
  });

  useEffect(() => {
    console.log(employeeData);
  }, [employeeData]);

  const handleBack = () => {
    navigate("/");
  };

  const handleCheckBoxClick = () => {
    if (onGoing) setOnGoing(false);
    else setOnGoing(true);
  };

  //needs HTMLInputElement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //name needs [] since its a key value doesn't
    setEmployeeData({
      ...employeeData,
      //check if checked box being edited else set
      [e.target.name]:
        e.target.name === "ongoing" ? e.target.checked : e.target.value,
      // [e.target.name]: e.target.value,
      // [e.target.name]: e.target.checked,
      //check boxes are different
      // contractType: e.target.value as "PERMANENT" | "CONTRACT",
      // employmentStatus: e.target.value as "PART_TIME" | "FULL_TIME",
    });
    // console.log(employeeData);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const newEmployee = {};

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
          <input
            id="firstname"
            name="firstName"
            type="text"
            onChange={handleChange}
          ></input>

          <label htmlFor="middlename">Middle Name</label>
          <input
            id="middlename"
            name="middleName"
            type="text"
            onChange={handleChange}
          ></input>

          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            name="lastName"
            type="text"
            onChange={handleChange}
          ></input>
        </div>
        <h1>Contact Details</h1>
        <div className={classes.form__container}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
          ></input>

          <label htmlFor="mobileNumber">Phone Number</label>
          <p className={classes.form__container__subtitle}>
            Must Be An Australian Number
          </p>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            onChange={handleChange}
          ></input>

          <label htmlFor="address">Residential Address</label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={handleChange}
          ></input>
        </div>
        <h1>Employee Status</h1>
        <div className={classes.form__container}>
          <label>What Is Contract Type?</label>

          <div className={classes["form__radio-container"]}>
            <input
              id="permanent"
              type="radio"
              name="contractType"
              value="PERMANENT"
              // checked={employeeData.contractType === "PERMANENT"}
              onChange={handleChange}
            />
            <label htmlFor="permanent">Permanent </label>
          </div>

          <div className={classes["form__radio-container"]}>
            <input
              id="contract"
              type="radio"
              name="contractType"
              value="CONTRACT"
              onChange={handleChange}
              // checked={employeeData.contractType === "CONTRACT"}
            />
            <label htmlFor="contract">Contract</label>
          </div>

          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            onChange={handleChange}
          />

          <label htmlFor="finishdate">Finish Date</label>
          <input
            id="finishdate"
            name="finishDate"
            type="date"
            disabled={onGoing}
            onChange={handleChange}
          />

          <div className={classes["form__radio-container"]}>
            <label htmlFor="checkBox">On Going</label>
            <input
              id="checkBox"
              type="checkbox"
              name="ongoing"
              onClick={handleCheckBoxClick}
              onChange={handleChange}
            ></input>
          </div>

          <label>Is This Part-Time Or Full-Time?</label>

          <div className={classes["form__radio-container"]}>
            <input
              id="partTime"
              type="radio"
              name="employmentStatus"
              value="PART_TIME"
              onChange={handleChange}
            />
            <label htmlFor="partTime">Part-Time</label>
          </div>

          <div className={classes["form__radio-container"]}>
            <input
              id="fullTime"
              type="radio"
              name="employmentStatus"
              value="FULL_TIME"
              onChange={handleChange}
            />
            <label htmlFor="fullTime">Full-Time</label>
          </div>

          <label htmlFor="hoursPerWeek">Hours Per Week</label>
          <input
            id="hoursPerWeek"
            name="hoursPerWeek"
            type="number"
            onChange={handleChange}
          />
        </div>

        <div className={classes["form__button-container"]}>
          <button type="submit">Save</button>
          <button onClick={handleBack}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
