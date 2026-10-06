import React, { useEffect, useRef, useState } from "react";

import classes from "./Home.module.scss";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createEmployee,
  deleteEmployee,
  fetchAllEmployee,
  patchEmployee,
} from "../../services/LoadData";
import type { Employee } from "../../Employee";
import EmployeeCardRow from "../../components/EmployeeCardRow/EmployeeCardRow";
import EmployeeCardBlock from "../../components/EmployeeCardBlock/EmployeeCardBlock";
import { useNavigate } from "react-router";

import tableGrid from "../../assets/icons/table-list-solid-full.svg";
import tableRow from "../../assets/icons/table-cells-solid-full.svg";

import Dropdown from "../../components/Dropdown/Dropdown";

import SearchBar from "../../components/SearchBar/SearchBar";

import PageCounter from "../../components/PageCounter/PageCounter";

import Modal from "../../components/Modal/Modal";

import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

export default function Home() {
  // const [employees, setEmployees] = useState<Employee[]>([]);

  const [tableState, setTableState] = useState(0);

  const [page, setCurrentPage] = useState(1);
  // const [finalPage, setFinalPage] = useState(1);

  const [pageSize, setPageSize] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  // const [loadingState, setLoadingState] = useState("LOADING");

  const navigate = useNavigate();

  // const getEmployeesData = async () => {
  // setLoadingState("LOADING");
  // try {
  //   const data = await fetchAllEmployee(page, pageSize, searchTerm);
  //   setEmployees(data["data"]);
  //   setCurrentPage(data["currentPage"]);
  //   setFinalPage(data["totalPages"]);
  // } catch {
  //   setLoadingState("ERROR");
  // } finally {
  //   setLoadingState("SUCCESS");
  // }
  // };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees", page, pageSize, searchTerm],
    queryFn: () => fetchAllEmployee(page, pageSize, searchTerm),
  });

  const employees = data?.data ?? [];
  const finalPage = data?.totalPages ?? 5;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

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

  // useEffect(() => {
  //   getEmployeesData();
  //   // console.log("rerender");
  // }, [page, searchTerm, pageSize]);

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

      <SearchBar
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
      />

      <Dropdown setPageSize={setPageSize} setCurrentPage={setCurrentPage} />

      {finalPage > 1 ? (
        <PageCounter
          page={page}
          setCurrentPage={setCurrentPage}
          finalPage={finalPage}
        />
      ) : null}

      {selectedEmployee && (
        <Modal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      <div className={classes.card}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Error />
        ) : (
          employees.map((employee) => {
            if (tableState === 1) {
              return (
                <EmployeeCardRow
                  key={employee["id"]}
                  employee={employee}
                  onDelete={() => deleteMutation.mutate(employee.id)}
                />
              );
            } else {
              return (
                <EmployeeCardBlock
                  key={employee["id"]}
                  employee={employee}
                  onDelete={() => deleteMutation.mutate(employee.id)}
                  onModalClick={() => setSelectedEmployee(employee)}
                />
              );
            }
          })
        )}
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
