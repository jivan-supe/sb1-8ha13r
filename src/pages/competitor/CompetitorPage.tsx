import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import AddCompetitorModal from './AddCompetitorModal';

export default function CompetitorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIdentifyCompetitor = () => {
    // TODO: Implement competitor identification logic
    console.log('Identifying competitors...');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Competitor Information</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleIdentifyCompetitor}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Search className="h-5 w-5" />
            <span>Identify my Competitor</span>
          </button>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Competitor</span>
          </button>
        </div>
      </div>

      <AddCompetitorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}