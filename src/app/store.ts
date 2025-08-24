import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employee/employeeSlice';
import authReducer from '../features/auth/authSlice';
import timesheetReducer from '../features/timesheet/timesheetSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    auth: authReducer,
    timesheet: timesheetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
