import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileSpreadsheet, Upload, Download } from 'lucide-react';
import { RootState } from '../store';
import { exportToExcel, importFromExcel } from '../utils/excelUtils';
import { setError, importData, setLoading } from '../store/slices/employeeSlice';

export default function ExcelActions() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { employees, feedbacks, loading } = useSelector((state: RootState) => state.employee);

  const handleExport = () => {
    try {
      exportToExcel(employees, feedbacks);
    } catch (error) {
      dispatch(setError('Failed to export data to Excel'));
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      dispatch(setLoading(true));
      const data = await importFromExcel(file);
      dispatch(importData(data));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError('Failed to import Excel file'));
    } finally {
      dispatch(setLoading(false));
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".xlsx,.xls"
        className="hidden"
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        disabled={loading}
      >
        <Upload className="h-5 w-5" />
        <span>{loading ? 'Importing...' : 'Import Excel'}</span>
      </button>

      <button
        onClick={handleExport}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        <Download className="h-5 w-5" />
        <span>Export Excel</span>
      </button>
    </div>
  );
}