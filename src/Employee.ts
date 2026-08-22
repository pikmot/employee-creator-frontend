export interface Employee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  contractType: "PERMANENT" | "CONTRACT";
  employmentStatus: "FULL_TIME" | "PART_TIME";
  startDate: string;
  finishDate: string;
  ongoing: boolean;
  hoursPerWeek: number;
}
export interface CreateEmployeeData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  contractType: "PERMANENT" | "CONTRACT";
  employmentStatus: "FULL_TIME" | "PART_TIME";
  startDate: string;
  finishDate: string;
  ongoing: boolean;
  hoursPerWeek: number;
}
export interface UpdateEmployeeData {}
