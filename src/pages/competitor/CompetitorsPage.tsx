import { useState, useEffect } from "react";
import { Search, Plus, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import AddCompetitorModal from "./AddCompetitorModal";
import CompetitorLoader from "../../components/competitor/CompetitorLoader";
import SelectableCompetitorCard from "../../components/competitor/SelectableCompetitorCard";
import { competitorService } from "../../services/competitorService";
import { Competitor } from "../../types/competitor";

export default function CompetitorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [selectedCompetitors, setSelectedCompetitors] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    loadCompetitors();
  }, []);

  const loadCompetitors = async () => {
    try {
      setIsLoading(true);
      const data = await competitorService.getCompetitors();
      setCompetitors(data);
    } catch (error) {
      toast.error("Failed to load competitors");
      console.error("Error loading competitors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdentifyCompetitor = async () => {
    try {
      setIsIdentifying(true);
      const identifiedCompetitors =
        await competitorService.identifyCompetitors();
      setCompetitors(identifiedCompetitors);
      setSelectedCompetitors(new Set());
      toast.success("Successfully identified competitors");
    } catch (error) {
      toast.error("Failed to identify competitors");
      console.error("Error identifying competitors:", error);
    } finally {
      setIsIdentifying(false);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedCompetitors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSaveSelection = async () => {
    try {
      const selectedIds = Array.from(selectedCompetitors);
      await competitorService.saveSelectedCompetitors(selectedIds);
      toast.success("Successfully saved competitor selection");
    } catch (error) {
      toast.error("Failed to save competitor selection");
      console.error("Error saving competitor selection:", error);
    }
  };

  const handleAddCompetitor = async () => {
    await loadCompetitors();
    setIsModalOpen(false);
    toast.success("Competitor added successfully");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Competitors</h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <label className="block text-xl font-medium text-gray-700">
            4{" "}
            <label className="text-sm font-medium text-gray-700">
              competitors found
            </label>
          </label>
          {/* <button
            onClick={handleIdentifyCompetitor}
            disabled={isIdentifying}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <Search className="h-5 w-5" />
            <span>Identify my Competitors</span>
          </button> */}

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-2 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Competitor</span>
          </button>
        </div>
      </div>

      {isIdentifying ? (
        <div className="bg-white rounded-lg shadow-md p-12">
          <CompetitorLoader onComplete={() => setIsIdentifying(false)} />
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      ) : competitors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {competitors.map((competitor) => (
              <SelectableCompetitorCard
                key={competitor.id}
                competitor={competitor}
                isSelected={selectedCompetitors.has(competitor.id)}
                onToggleSelect={handleToggleSelect}
              />
            ))}
          </div>

          <div className="fixed bottom-6 right-6">
            <button
              onClick={handleSaveSelection}
              disabled={selectedCompetitors.size === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-lg"
            >
              <Save className="h-5 w-5" />
              <span>Save Selection ({selectedCompetitors.size})</span>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">No competitors found</p>
        </div>
      )}

      <AddCompetitorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddCompetitor}
      />
    </div>
  );
}
