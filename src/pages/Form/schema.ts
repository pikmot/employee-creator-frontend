import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(1, { error: "First Name Must Not be Blank" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { error: "Last Name Must Not be Blank" }),
  email: z.string().min(1, { error: "Email Must Not be Blank" }),
  mobileNumber: z.string().min(1, { error: "Mobile Number Must Not be Blank" }),
  address: z.string().min(1, { error: "Address Must Not be Blank" }),
  contractType: z.enum(["PERMANENT", "CONTRACT"]),
  employmentStatus: z.enum(["FULL_TIME", "PART_TIME"]),
  startDate: z.string().min(1, "Start Date is Required"),
  finishDate: z.string().optional(),
  onGoing: z.boolean(),
  hoursPerWeek: z.coerce.number().min(1).max(168),
});

export type EmployeeFormData = z.infer<typeof schema>;
