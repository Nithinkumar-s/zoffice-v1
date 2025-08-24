import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { get, post } from '@/lib/httpService';

export interface Employee {
  id?: number;
  EmployeeCode?: string;
  ShortName?: string;
  EmployeeName?: string;
  FullName?: string;
  LoginName?: string;
  Designation?: string;
  PFAccountNo?: string;
  EmailId?: string;
  ContactNumber?: string;
  Address?: string;
  AlternateNumber?: string;
  Location?: string;
  ReportTo?: string;
  Status?: string;
  JoiningDate?: string;
  LeavingDate?: string;
  HasSignedHRPolicy?: boolean;
  HasSignedInfoSecPolicy?: boolean;
  HasSignedRulesOfBehaviour?: boolean;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk<Employee[]>(
  'employee/fetchEmployees',
  async () => {
    return await get('/api/Employees');
  }
);

export const addEmployeeAsync = createAsyncThunk<Employee, Employee>(
  'employee/addEmployee',
  async (employee) => {
    return await post('/employees', employee);
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(addEmployeeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployeeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployeeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add employee';
      });
  },
});

export const { addEmployee, removeEmployee, setEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
