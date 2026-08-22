import React, { useEffect, useState } from "react";

import classes from "./Home.module.scss";

import { fetchAllEmployee } from "../../services/LoadData";
import type { Employee } from "../../Employee";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { useNavigate } from "react-router";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const navigate = useNavigate();

  const getEmployeesData = async () => {
    const data = await fetchAllEmployee();

    setEmployees(data);
  };

  const handleClick = () => {
    navigate("/employees/createEmployee");
  };

  useEffect(() => {
    getEmployeesData();
  }, []);

  return (
    <div>
      <h1 className={classes.home__header}>Employee List</h1>
      <article>
        <div className={classes["home__sub-title"]}>
          <p className={classes["home__sub-title__text"]}>
            Please Click On "EDIT" for furhter details
          </p>
          <button onClick={handleClick}>Add Employee</button>
        </div>
      </article>
      {employees.map((employee) => {
        return (
          <EmployeeCard
            key={employee["id"]}
            employee={employee}
            setEmployees={setEmployees}
          />
        );
      })}
    </div>
  );
}
