import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Domain, ProductStage, Industry } from "../../types/product";
import { CompetitorFormData } from "../../types/competitor";
import { competitorService } from "../../services/competitorService";

interface AddCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const domains: Domain[] = ["B2B", "B2C", "B2B2C"];
const stages: ProductStage[] = ["LAUNCH", "PMF", "GROWTH", "MATURITY"];
const industries: Industry[] = [
  "Finance",
  "Travel & Tourism",
  "Healthcare",
  "Retail & E-commerce",
  "Technology & IT",
  "Education",
  "Media & Entertainment",
  "Real Estate",
  "Automotive",
  "Logistics & Supply Chain",
  "Energy & Utilities",
  "Agriculture",
  "Sports & Fitness",
  "Legal & Compliance",
  "Government & Public Sector",
];

export default function AddCompetitorModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCompetitorModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CompetitorFormData>({
    name: "",
    website: "",
    domain: "B2B",
    industry: "Finance",
    stage: "LAUNCH",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Competitor name is required";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website URL is required";
    } else if (!/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsSubmitting(true);
        await competitorService.addCompetitor(formData);
        onSuccess();
      } catch (error) {
        toast.error("Failed to add competitor");
        console.error("Error adding competitor:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Add New Competitor
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.name
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              required
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.website
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
              placeholder="https://example.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-600">{errors.website}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Domain
            </label>
            <select
              required
              value={formData.domain}
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value as Domain })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.domain
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            >
              <option value="">Select a domain</option>
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
            {errors.domain && (
              <p className="mt-1 text-sm text-red-600">{errors.domain}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Industry
            </label>
            <select
              required
              value={formData.industry}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  industry: e.target.value as Industry,
                })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.industry
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Stage
            </label>
            <select
              required
              value={formData.stage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stage: e.target.value as ProductStage,
                })
              }
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.stage
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }`}
            >
              <option value="">Select a stage</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
            {errors.stage && (
              <p className="mt-1 text-sm text-red-600">{errors.stage}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
