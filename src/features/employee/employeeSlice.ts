import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  id: number;
  name: string;
  position: string;
}

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },
    removeEmployee(state, action: PayloadAction<number>) {
      state.employees = state.employees.filter(e => e.id !== action.payload);
    },
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
    },
  },
});

export const { addEmployee, removeEmployee, setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
