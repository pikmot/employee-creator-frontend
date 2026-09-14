import React from "react";

import classes from "./EmployeeCardBlock.module.scss";
import type { Employee } from "../../Employee";
import { fetchAllEmployee, deleteEmployee } from "../../services/LoadData";
import { useNavigate } from "react-router";

import userImg from "../../assets/icons/circle-user-solid-full.svg";

interface EmployeeCardBlock {
  employee: Employee;
  setEmployees: (employee: Employee[]) => void;
}

export default function EmployeeCardBlock({
  employee,
  setEmployees,
}: EmployeeCardBlock) {
  const navigate = useNavigate();

  const endDate = employee.finishDate
    ? new Date(employee.finishDate)
    : new Date();

  const startDate = new Date(employee.startDate);

  const employmentTime = Math.floor(
    (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 / 365,
  );

  const handleDelete = async () => {
    await deleteEmployee(employee.id);
    setEmployees(await fetchAllEmployee());
  };

  const handleEdit = async () => {
    navigate("/employees/" + employee.id + "/editEmployee");
  };

  return (
    <article className={classes["employee-card"]}>
      <div>
        <img src={userImg} className={classes["employee-card__img"]} />
        <p className={classes["employee-card__title"]}>
          {employee.firstName} {employee.middleName} {employee.lastName}
        </p>
        <p className={classes["employee-card__body"]}>
          {employee.contractType} - {employmentTime}yr
        </p>
        <p className={classes["employee-card__body"]}>{employee.firstName}</p>
      </div>
      <div className={classes["employee-card__button"]}>
        <button onClick={handleEdit}> Edit</button> |{" "}
        <button onClick={handleDelete}>Remove</button>
      </div>
    </article>
  );
}
