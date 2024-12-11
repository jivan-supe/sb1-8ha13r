import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Domain, Industry, ProductStage } from "../../types/product";

const domains: Domain[] = ["B2B", "B2C", "B2B2C"];
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

const stages: ProductStage[] = ["LAUNCH", "PMF", "GROWTH", "MATURITY"];

export default function AddProductForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    domain: "" as Domain,
    industry: "",
    stage: "" as ProductStage,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website URL is required";
    } else if (!/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = "Please enter a valid URL";
    }

    if (!formData.domain) {
      newErrors.domain = "Domain is required";
    }

    if (!formData.industry.trim()) {
      newErrors.industry = "Industry is required";
    }

    if (!formData.stage) {
      newErrors.stage = "Product stage is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: Implement product creation logic
      console.log("Form submitted:", formData);
      navigate("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Add Product Information
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            Website URL
          </label>
          <input
            type="url"
            id="website"
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
          <label
            htmlFor="domain"
            className="block text-sm font-medium text-gray-700"
          >
            Domain
          </label>
          <select
            id="domain"
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
              setFormData({ ...formData, industry: e.target.value as Industry })
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
          <label
            htmlFor="stage"
            className="block text-sm font-medium text-gray-700"
          >
            Product Stage
          </label>
          <select
            id="stage"
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
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
}
