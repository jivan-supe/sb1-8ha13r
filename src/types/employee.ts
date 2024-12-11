export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  joinedDate: string;
}

export interface FeedbackEntry {
  id: string;
  employeeId: string;
  date: string;
  performance: 'excellent' | 'good' | 'average' | 'poor';
  attendance: 'present' | 'absent' | 'late';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeState {
  employees: Employee[];
  feedbacks: FeedbackEntry[];
  loading: boolean;
  error: string | null;
}