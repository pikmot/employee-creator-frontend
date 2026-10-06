import React from "react";
import classes from "./Modal.module.scss";
import type { Employee } from "../../Employee";

interface ModalProps {
  employee: Employee;
}

export default function Modal({ employee }: ModalProps) {
  return (
    <div>
      <h2>{employee.firstName + employee.middleName + employee.lastName}</h2>
      <p>Email : {employee.email}</p>
      <p>Mobile: {employee.mobileNumber}</p>
      <p>Address: {employee.address}</p>
      <p>Contract: {employee.contractType}</p>
      <p>Status: {employee.employmentStatus}</p>
      <p>Hours per week: {employee.hoursPerWeek}</p>
      <p>Start date: {employee.startDate}</p>
      <p>Finish date: {employee.finishDate}</p>
    </div>
  );
}
