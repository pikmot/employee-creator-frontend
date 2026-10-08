import React, { useEffect } from "react";
import classes from "./Modal.module.scss";
import type { Employee } from "../../Employee";

import { useRef } from "react";

interface ModalProps {
  employee: Employee;
  onClose: () => void;
}

export default function Modal({ employee, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    modalRef.current?.showModal();
  });

  return (
    <dialog className={classes.modal} ref={modalRef}>
      <button onClick={onClose}>X</button>
      <h2>{employee.firstName + employee.middleName + employee.lastName}</h2>
      <p>Email : {employee.email}</p>
      <p>Mobile: {employee.mobileNumber}</p>
      <p>Address: {employee.address}</p>
      <p>Contract: {employee.contractType}</p>
      <p>Status: {employee.employmentStatus}</p>
      <p>Hours per week: {employee.hoursPerWeek}</p>
      <p>Start date: {employee.startDate}</p>
      <p>Finish date: {employee.onGoing ? "ONGOING" : employee.finishDate}</p>
    </dialog>
  );
}
