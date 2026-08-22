const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//add type or error something to do with intefaces NOT values
import type {
  Employee,
  CreateEmployeeData,
  UpdateEmployeeData,
} from "../Employee";

export const fetchAllEmployee = async (): Promise<Employee[]> => {
  let response: Employee[] = await fetch(BACKEND_URL + "/employees").then(
    (res) => res.json(),
  );

  console.log(response);

  return response;
};

export const fetchEmployeeById = async (id: number): Promise<Employee> => {
  let response: Employee = await fetch(BACKEND_URL + "/employees/" + id).then(
    (res) => res.json(),
  );

  console.log(response);

  return response;
};

export const createEmployee = async (data: CreateEmployeeData) => {
  const response = await fetch(BACKEND_URL + "/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to Create Employee");
  }
  return (await response.json()) as CreateEmployeeData;
};

export const deleteEmployee = async (id: number) => {
  // console.log(id);

  //no return needed! delete only
  const response = await fetch(BACKEND_URL + "/employees/" + id, {
    method: "DELETE",
  });

  //no return for deletes -> reflects backend
  if (!response.ok) {
    throw new Error("Failed to Delete Employee");
  }
  // return (await response.json()) as Employee;
};

export const patchEmployee = async (id: number, data: CreateEmployeeData) => {
  const response = await fetch(BACKEND_URL + "/employees/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

console.log("RUNNING TSX");

// createTask({ title: "TEST", description: "DESC", status: "START" });
// patchTask(2, { title: "TEST NEW NEW" });

// fetchAllEmployee();
// deleteTask(4);
// fetchAllTasks();
