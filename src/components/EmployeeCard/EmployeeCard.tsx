import React from "react";

import classes from "./EmployeeCard.module.scss";
import type { Employee } from "../../Employee";
import { fetchAllEmployee, deleteEmployee } from "../../services/LoadData";
import { useNavigate } from "react-router";

interface EmloyeeCardProps {
  employee: Employee;
  setEmployees: (employee: Employee[]) => void;
}

export default function EmployeeCard({
  employee,
  setEmployees,
}: EmloyeeCardProps) {
  const navigate = useNavigate();

  //time = EndDate - Start date

  //edge case if finishDate ongoing just create new date()/current
  const endDate = employee.finishDate
    ? new Date(employee.finishDate)
    : new Date();

  const startDate = new Date(employee.startDate);
  //   console.log(endDate);
  //   console.log(startDate);

  //date() for day/month/yr & date().getTime() for actual number
  //getTime() -> miliseconds -> convert to yrs
  const employmentTime = Math.floor(
    (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 / 365,
  );

  //   console.log(employmentTime);

  const handleDelete = async () => {
    //don't forget awaits IMPORTANT
    await deleteEmployee(employee.id);
    setEmployees(await fetchAllEmployee());
  };

  const handleEdit = async () => {
    navigate("/employees/" + employee.id + "/editEmployee");
  };

  return (
    <article className={classes["employee-card"]}>
      <div>
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
