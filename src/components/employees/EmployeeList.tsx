import { useSelector } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import { RootState } from '../../store';
import EmployeeCard from './EmployeeCard';
import AddEmployeeModal from './AddEmployeeModal';
import { useState } from 'react';

export default function EmployeeList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { employees } = useSelector((state: RootState) => state.employee);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}