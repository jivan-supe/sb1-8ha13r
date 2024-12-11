import { Globe, Award, Zap, Percent, ListChecks } from 'lucide-react';
import { Competitor } from '../../types/competitor';
import SimilarityBadge from './SimilarityBadge';
import FeatureList from './FeatureList';

interface CompetitorCardProps {
  competitor: Competitor;
}

export default function CompetitorCard({ competitor }: CompetitorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{competitor.name}</h3>
          {competitor.domain && (
            <span className="inline-block mt-1 px-2 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
              {competitor.domain}
            </span>
          )}
        </div>
        <SimilarityBadge score={competitor.similarityScore} />
      </div>

      <p className="text-gray-600 mb-4">{competitor.description}</p>

      <div className="space-y-4">
        <a
          href={competitor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-600 hover:text-indigo-600"
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="text-sm">Visit Website</span>
        </a>

        {competitor.similarFeatures && competitor.similarFeatures.length > 0 && (
          <div className="border-t pt-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <ListChecks className="h-4 w-4 mr-2" />
              Similar Features
            </h4>
            <FeatureList 
              features={competitor.similarFeatures} 
              type="similar"
            />
          </div>
        )}

        {competitor.uniqueFeatures && competitor.uniqueFeatures.length > 0 && (
          <div className="border-t pt-3">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Unique Features
            </h4>
            <FeatureList 
              features={competitor.uniqueFeatures} 
              type="unique"
            />
          </div>
        )}
      </div>
    </div>
  );
}