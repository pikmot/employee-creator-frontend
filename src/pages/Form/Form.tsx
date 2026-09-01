import React, { useEffect, useState } from "react";

import classes from "./Form.module.scss";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

import { useNavigate, useParams } from "react-router";
import {
  createEmployee,
  fetchEmployeeById,
  patchEmployee,
} from "../../services/LoadData";

export default function Form() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditingEmployee = Boolean(id);

  const {
    reset,
    formState: { errors, isSubmitSuccesful },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      contractType: "PERMANENT",
      employmentStatus: "PART_TIME",
    },
  });

  // const [onGoing, setOnGoing] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    contractType: "PERMANENT" as "PERMANENT" | "CONTRACT", //only ever options
    employmentStatus: "PART_TIME" as "FULL_TIME" | "PART_TIME",
    startDate: "",
    finishDate: "",
    onGoing: false,
    hoursPerWeek: 0,
  });

  // useEffect(() => {
  //   console.log(employeeData);
  // }, [employeeData]);

  const getEmployeeDetails = async () => {
    //somethings may be null -> apply nullish coalesce to set ""

    const data = await fetchEmployeeById(Number(id));

    setEmployeeData({
      ...data,
      middleName: data.middleName ?? "",
      finishDate: data.finishDate ?? "",
      onGoing: data.onGoing ?? false,
    });
  };

  useEffect(() => {
    if (isEditingEmployee) {
      getEmployeeDetails();
    }
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  // const handleCheckBoxClick = () => {
  //   if (onGoing) setOnGoing(false);
  //   else setOnGoing(true);
  // };

  //needs HTMLInputElement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //name needs [] since its a key value doesn't
    setEmployeeData({
      ...employeeData,
      //check if checked box being edited else set
      [e.target.name]:
        e.target.name === "onGoing" ? e.target.checked : e.target.value,
      // [e.target.name]: e.target.value,
      // [e.target.name]: e.target.checked,
      //check boxes are different
      // contractType: e.target.value as "PERMANENT" | "CONTRACT",
      // employmentStatus: e.target.value as "PART_TIME" | "FULL_TIME",
    });
    // console.log(employeeData);
  };

  // const handleSubmit = async (e: React.SubmitEvent) => {
  //   e.preventDefault();

  //   if (isEditingEmployee) {
  //     await patchEmployee(Number(id), employeeData);
  //   } else {
  //     await createEmployee(employeeData);
  //   }

  //   navigate("/");
  // };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <header className={classes.form__header}>
        <button className={classes.form__header__button} onClick={handleBack}>
          BACK
        </button>
        <h1>Add New Employee</h1>
      </header>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Personal Information</h1>
        <div className={classes.form__container}>
          <label htmlFor="firstname">First Name</label>
          {/* <input
            id="firstname"
            name="firstName"
            type="text"
            value={employeeData.firstName}
            onChange={handleChange}
            required
          ></input> */}

          <input id="firstname" type="text" {...register("firstName")} />
          <small className={classes["form__error-text"]}>
            {errors.firstName?.message}
          </small>

          <label htmlFor="middlename">Middle Name</label>
          {/* <input
            id="middlename"
            name="middleName"
            type="text"
            value={employeeData.middleName}
            onChange={handleChange}
          ></input> */}

          <input id="middlename" type="text" {...register("middleName")} />

          <label htmlFor="lastname">Last Name</label>
          {/* <input
            id="lastname"
            name="lastName"
            type="text"
            value={employeeData.lastName}
            onChange={handleChange}
            required
          ></input> */}

          <input id="lastname" type="text" {...register("lastName")} />
          <small className={classes["form__error-text"]}>
            {errors.lastName?.message}
          </small>
        </div>
        <h1>Contact Details</h1>
        <div className={classes.form__container}>
          <label htmlFor="email">Email Address</label>
          {/* <input
            id="email"
            name="email"
            type="email"
            value={employeeData.email}
            onChange={handleChange}
            required
          ></input> */}

          <input id="email" type="email" {...register("email")} />
          <small className={classes["form__error-text"]}>
            {errors.email?.message}
          </small>

          <label htmlFor="mobileNumber">Phone Number</label>
          <p className={classes.form__container__subtitle}>
            Must Be An Australian Number
          </p>
          {/* <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            value={employeeData.mobileNumber}
            onChange={handleChange}
            required
          ></input> */}

          <input id="mobileNumber" type="tel" {...register("mobileNumber")} />
          <small className={classes["form__error-text"]}>
            {errors.mobileNumber?.message}
          </small>

          <label htmlFor="address">Residential Address</label>
          {/* <input
            id="address"
            name="address"
            type="text"
            value={employeeData.address}
            onChange={handleChange}
            required
          ></input> */}

          <input id="address" type="text" {...register("address")} />
          <small className={classes["form__error-text"]}>
            {errors.address?.message}
          </small>
        </div>
        <h1>Employee Status</h1>
        <div className={classes.form__container}>
          <label>What Is Contract Type?</label>

          <div className={classes["form__radio-container"]}>
            {/* <input
              id="permanent"
              type="radio"
              name="contractType"
              value="PERMANENT"
              checked={employeeData.contractType === "PERMANENT"}
              onChange={handleChange}
            /> */}

            <input
              id="permanent"
              type="radio"
              value="PERMANENT"
              {...register("contractType")}
            />
            <small className={classes["form__error-text"]}>
              {errors.contractType?.message}
            </small>

            <label htmlFor="permanent">Permanent </label>
          </div>

          <div className={classes["form__radio-container"]}>
            {/* <input
              id="contract"
              type="radio"
              name="contractType"
              value="CONTRACT"
              onChange={handleChange}
              checked={employeeData.contractType === "CONTRACT"}
            /> */}

            <input
              id="contract"
              type="radio"
              value="CONTRACT"
              {...register("contractType")}
            />
            <small className={classes["form__error-text"]}>
              {errors.contractType?.message}
            </small>

            <label htmlFor="contract">Contract</label>
          </div>

          <label htmlFor="startDate">Start Date</label>
          {/* <input
            id="startDate"
            name="startDate"
            type="date"
            value={employeeData.startDate}
            onChange={handleChange}
            required
          /> */}

          <input id="startDate" type="date" {...register("startDate")} />
          <small className={classes["form__error-text"]}>
            {errors.startDate?.message}
          </small>

          <label htmlFor="finishdate">Finish Date</label>
          {/* <input
            id="finishdate"
            name="finishDate"
            type="date"
            value={employeeData.finishDate}
            disabled={employeeData.onGoing}
            onChange={handleChange}
            required
          /> */}

          <input id="finishDate" type="date" {...register("finishDate")} />

          <div className={classes["form__radio-container"]}>
            <label htmlFor="checkBox">On Going</label>
            {/* <input
              id="checkBox"
              type="checkbox"
              name="onGoing"
              checked={employeeData.onGoing}
              // onClick={handleCheckBoxClick}
              onChange={handleChange}
            ></input> */}
          </div>

          <label>Is This Part-Time Or Full-Time?</label>

          <div className={classes["form__radio-container"]}>
            {/* <input
              id="partTime"
              type="radio"
              name="employmentStatus"
              value="PART_TIME"
              checked={employeeData.employmentStatus === "PART_TIME"}
              onChange={handleChange}
            /> */}

            <input
              id="partTime"
              type="radio"
              value="PART_TIME"
              {...register("employmentStatus")}
            />
            <small className={classes["form__error-text"]}>
              {errors.employmentStatus?.message}
            </small>

            <label htmlFor="partTime">Part-Time</label>
          </div>

          <div className={classes["form__radio-container"]}>
            {/* <input
              id="fullTime"
              type="radio"
              name="employmentStatus"
              value="FULL_TIME"
              checked={employeeData.employmentStatus === "FULL_TIME"}
              onChange={handleChange}
            /> */}

            <input
              id="fullTime"
              type="radio"
              value="FULL_TIME"
              {...register("employmentStatus")}
            />
            <small className={classes["form__error-text"]}>
              {errors.employmentStatus?.message}
            </small>

            <label htmlFor="fullTime">Full-Time</label>
          </div>

          <label htmlFor="hoursPerWeek">Hours Per Week</label>
          {/* <input
            id="hoursPerWeek"
            name="hoursPerWeek"
            type="number"
            value={employeeData.hoursPerWeek}
            onChange={handleChange}
            min={1}
            max={168}
          /> */}

          <input
            id="hoursPerWeek"
            type="number"
            {...register("hoursPerWeek")}
          />
          <small className={classes["form__error-text"]}>
            {errors.hoursPerWeek?.message}
          </small>
        </div>

        <br></br>

        <div className={classes["form__button-container"]}>
          <button type="submit">Save</button>
          <button onClick={handleBack} type="button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
