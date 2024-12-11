import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogOut, BarChart3 } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';
import ProductDropdown from './header/ProductDropdown';

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-indigo-600">
              <BarChart3 className="h-8 w-8" />
              <span>CompetitorIQ</span>
            </Link>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center space-x-6">
              <ProductDropdown />
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
          
          {!isAuthenticated && (
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-900"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}