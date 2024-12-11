import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Always authenticated in development
  return <>{children}</>;
}