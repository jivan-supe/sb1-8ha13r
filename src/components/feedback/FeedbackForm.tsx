import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../../store/slices/employeeSlice';
import { FeedbackEntry } from '../../types/employee';

interface FeedbackFormProps {
  employeeId: string;
  onSubmit?: () => void;
}

export default function FeedbackForm({ employeeId, onSubmit }: FeedbackFormProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    performance: 'good',
    attendance: 'present',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feedback: FeedbackEntry = {
      id: crypto.randomUUID(),
      employeeId,
      date: new Date().toISOString().split('T')[0],
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addFeedback(feedback));
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Performance</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.performance}
          onChange={(e) => setFormData({ ...formData, performance: e.target.value as any })}
        >
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Attendance</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.attendance}
          onChange={(e) => setFormData({ ...formData, attendance: e.target.value as any })}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Submit Feedback
      </button>
    </form>
  );
}