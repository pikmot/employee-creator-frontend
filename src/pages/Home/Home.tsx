import React, { useEffect, useState } from "react";

import classes from "./Home.module.scss";

import { fetchAllEmployee } from "../../services/LoadData";
import type { Employee } from "../../Employee";
import EmployeeCardRow from "../../components/EmployeeCardRow/EmployeeCardRow";
import EmployeeCardBlock from "../../components/EmployeeCardBlock/EmployeeCardBlock";
import { useNavigate } from "react-router";

import tableGrid from "../../assets/icons/table-list-solid-full.svg";
import tableRow from "../../assets/icons/table-cells-solid-full.svg";

import PageCounter from "../../components/PageCounter/PageCounter";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [tableState, setTableState] = useState(0);

  const [page, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);

  const navigate = useNavigate();

  const getEmployeesData = async () => {
    const data = await fetchAllEmployee(page);

    setEmployees(data["data"]);
    setCurrentPage(data["currentPage"]);
    setFinalPage(data["totalPages"]);
  };

  const handleTableChange = () => {
    if (tableState == 0) {
      setTableState(1);
    } else {
      setTableState(0);
    }
  };

  const handleClick = () => {
    navigate("/employees/createEmployee");
  };

  useEffect(() => {
    getEmployeesData();
  }, [page]);

  return (
    <div>
      <h1 className={classes.home__header}>Employee List</h1>
      <article>
        <div className={classes["home__sub-title"]}>
          <p className={classes["home__sub-title__text"]}>
            Please Click On "EDIT" for further details
          </p>
          <button onClick={handleClick} className={classes.button}>
            Add Employee
          </button>
        </div>
        <div className={classes.img__container}>
          <button
            onClick={handleTableChange}
            disabled={tableState === 1}
            className={tableState ? classes.clicked : ""}
          >
            <img src={tableGrid} />
          </button>
          <button
            onClick={handleTableChange}
            disabled={tableState === 0}
            className={tableState ? "" : classes.clicked}
          >
            <img src={tableRow} />
          </button>
        </div>
      </article>

      <hr className={classes["line-break"]} />

      {finalPage > 1 ? (
        <PageCounter
          page={page}
          setCurrentPage={setCurrentPage}
          finalPage={finalPage}
        />
      ) : null}

      <div className={classes.card}>
        {employees.map((employee) => {
          if (tableState === 1) {
            return (
              <EmployeeCardRow
                key={employee["id"]}
                employee={employee}
                setEmployees={setEmployees}
                getEmployeesData={getEmployeesData}
              />
            );
          } else {
            return (
              <EmployeeCardBlock
                key={employee["id"]}
                employee={employee}
                setEmployees={setEmployees}
                getEmployeesData={getEmployeesData}
              />
            );
          }
        })}
      </div>

      <hr className={classes["line-break"]} />

      {finalPage > 1 ? (
        <PageCounter
          page={page}
          setCurrentPage={setCurrentPage}
          finalPage={finalPage}
        />
      ) : null}
    </div>
  );
}
