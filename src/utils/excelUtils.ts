import { utils, write } from 'xlsx';
import { Employee, FeedbackEntry } from '../types/employee';

export const exportToExcel = (employees: Employee[], feedbacks: FeedbackEntry[]) => {
  // Prepare employee data
  const employeeData = employees.map(emp => ({
    'Employee ID': emp.id,
    'Name': emp.name,
    'Email': emp.email,
    'Position': emp.position,
    'Department': emp.department,
    'Joined Date': emp.joinedDate
  }));

  // Prepare feedback data
  const feedbackData = feedbacks.map(fb => ({
    'Feedback ID': fb.id,
    'Employee ID': fb.employeeId,
    'Date': fb.date,
    'Performance': fb.performance,
    'Attendance': fb.attendance,
    'Notes': fb.notes,
    'Created At': fb.createdAt,
    'Updated At': fb.updatedAt
  }));

  // Create workbook
  const wb = utils.book_new();

  // Create worksheets
  const wsEmployees = utils.json_to_sheet(employeeData);
  const wsFeedback = utils.json_to_sheet(feedbackData);

  // Add column widths
  const maxWidth = 50;
  const employeeCols = [
    { wch: 20 }, // ID
    { wch: 30 }, // Name
    { wch: 30 }, // Email
    { wch: 20 }, // Position
    { wch: 20 }, // Department
    { wch: 15 }, // Joined Date
  ];

  const feedbackCols = [
    { wch: 20 }, // Feedback ID
    { wch: 20 }, // Employee ID
    { wch: 15 }, // Date
    { wch: 15 }, // Performance
    { wch: 15 }, // Attendance
    { wch: maxWidth }, // Notes
    { wch: 20 }, // Created At
    { wch: 20 }, // Updated At
  ];

  wsEmployees['!cols'] = employeeCols;
  wsFeedback['!cols'] = feedbackCols;

  // Add worksheets to workbook
  utils.book_append_sheet(wb, wsEmployees, 'Employees');
  utils.book_append_sheet(wb, wsFeedback, 'Feedback');

  // Generate Excel file
  const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Download file
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `employee_data_${new Date().toISOString().split('T')[0]}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const importFromExcel = async (file: File): Promise<{ employees: Employee[], feedbacks: FeedbackEntry[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = utils.read(data, { type: 'array' });

        // Parse Employees sheet
        const employeesSheet = workbook.Sheets['Employees'];
        if (!employeesSheet) {
          throw new Error('Employees sheet not found');
        }
        const rawEmployees = utils.sheet_to_json(employeesSheet) as any[];
        
        // Transform employee data
        const employees: Employee[] = rawEmployees.map(raw => ({
          id: raw['Employee ID'],
          name: raw['Name'],
          email: raw['Email'],
          position: raw['Position'],
          department: raw['Department'],
          joinedDate: raw['Joined Date']
        }));

        // Parse Feedback sheet
        const feedbackSheet = workbook.Sheets['Feedback'];
        if (!feedbackSheet) {
          throw new Error('Feedback sheet not found');
        }
        const rawFeedback = utils.sheet_to_json(feedbackSheet) as any[];
        
        // Transform feedback data
        const feedbacks: FeedbackEntry[] = rawFeedback.map(raw => ({
          id: raw['Feedback ID'],
          employeeId: raw['Employee ID'],
          date: raw['Date'],
          performance: raw['Performance'].toLowerCase(),
          attendance: raw['Attendance'].toLowerCase(),
          notes: raw['Notes'],
          createdAt: raw['Created At'] || new Date().toISOString(),
          updatedAt: raw['Updated At'] || new Date().toISOString()
        }));

        resolve({ employees, feedbacks });
      } catch (error) {
        reject(new Error('Failed to parse Excel file: ' + (error as Error).message));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
};