import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user', 'isAuthenticated'],
};

const employeePersistConfig = {
  key: 'employee',
  storage,
  whitelist: ['employees', 'feedbacks'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedEmployeeReducer = persistReducer(employeePersistConfig, employeeReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    employee: persistedEmployeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;