import { Percent } from 'lucide-react';

interface SimilarityBadgeProps {
  score: number;
}

export default function SimilarityBadge({ score }: SimilarityBadgeProps) {
  const getColorClass = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-blue-100 text-blue-800';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className={`flex items-center px-2 py-1 rounded-full ${getColorClass(score)}`}>
      <Percent className="h-3 w-3 mr-1" />
      <span className="text-sm font-medium">{score}% Similar</span>
    </div>
  );
}