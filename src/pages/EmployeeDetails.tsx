import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import FeedbackForm from '../components/feedback/FeedbackForm';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  const employee = useSelector((state: RootState) =>
    state.employee.employees.find(emp => emp.id === id)
  );
  
  const feedbacks = useSelector((state: RootState) =>
    state.employee.feedbacks.filter(fb => fb.employeeId === id)
  );

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const getAttendanceIcon = (attendance: string) => {
    switch (attendance) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'late':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{employee.name}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Position</p>
            <p className="text-gray-900">{employee.position}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-gray-900">{employee.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900">{employee.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Joined Date</p>
            <p className="text-gray-900">
              {new Date(employee.joinedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Feedback History</h2>
        <button
          onClick={() => setShowFeedbackForm(!showFeedbackForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {showFeedbackForm ? 'Cancel' : 'Add Feedback'}
        </button>
      </div>

      {showFeedbackForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <FeedbackForm
            employeeId={id!}
            onSubmit={() => setShowFeedbackForm(false)}
          />
        </div>
      )}

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">
                  {new Date(feedback.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {getAttendanceIcon(feedback.attendance)}
                <span className="capitalize text-sm text-gray-600">
                  {feedback.attendance}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-sm capitalize
                ${feedback.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                feedback.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                feedback.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}"
              >
                {feedback.performance}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{feedback.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}