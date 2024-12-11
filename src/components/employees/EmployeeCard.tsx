import { useNavigate } from 'react-router-dom';
import { User, Calendar } from 'lucide-react';
import { Employee } from '../../types/employee';

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/employee/${employee.id}`)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-3 rounded-full">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600">{employee.department}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Joined: {new Date(employee.joinedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}