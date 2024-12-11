import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types/auth';
import { mockUser } from '../../utils/mockData';

const initialState: AuthState = {
  user: mockUser,
  token: 'mock-token-123',
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = mockUser; // Reset to mock user instead of null
      state.token = 'mock-token-123';
      state.isAuthenticated = true; // Keep authenticated
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;