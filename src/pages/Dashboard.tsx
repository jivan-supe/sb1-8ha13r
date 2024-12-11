import { useSelector } from 'react-redux';
import { RootState } from '../store';
import EmployeeList from '../components/employees/EmployeeList';
import ExcelActions from '../components/ExcelActions';

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>
          </div>
          <ExcelActions />
        </div>
      </div>
      
      <EmployeeList />
    </div>
  );
}