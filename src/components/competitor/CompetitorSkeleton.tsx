import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CompetitorSkeleton() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
      <img
        src="https://cdn.dribbble.com/users/1785628/screenshots/5529661/media/967f337c28859b113c13d75539b03432.gif"
        alt="No competitors"
        className="w-64 h-64 object-contain mb-6"
      />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Competitors Found</h3>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Start by adding your product information to help us identify relevant competitors
      </p>
      <button
        onClick={() => navigate('/product/add')}
        className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        <span>Add Product Info</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}