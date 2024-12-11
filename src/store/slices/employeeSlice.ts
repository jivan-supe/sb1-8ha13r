import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, FeedbackEntry, EmployeeState } from '../../types/employee';
import { mockEmployees } from '../../utils/mockData';

const initialState: EmployeeState = {
  employees: mockEmployees,
  feedbacks: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    removeEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      state.feedbacks = state.feedbacks.filter(fb => fb.employeeId !== action.payload);
    },
    addFeedback: (state, action: PayloadAction<FeedbackEntry>) => {
      state.feedbacks.push(action.payload);
    },
    updateFeedback: (state, action: PayloadAction<FeedbackEntry>) => {
      const index = state.feedbacks.findIndex(fb => fb.id === action.payload.id);
      if (index !== -1) {
        state.feedbacks[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    importData: (state, action: PayloadAction<{ employees: Employee[]; feedbacks: FeedbackEntry[] }>) => {
      state.employees = action.payload.employees;
      state.feedbacks = action.payload.feedbacks;
    },
  },
});

export const {
  addEmployee,
  removeEmployee,
  addFeedback,
  updateFeedback,
  setLoading,
  setError,
  importData,
} = employeeSlice.actions;

export default employeeSlice.reducer;