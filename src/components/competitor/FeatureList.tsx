import { Zap, Check } from 'lucide-react';

interface FeatureListProps {
  features: string[];
  type: 'similar' | 'unique';
}

export default function FeatureList({ features, type }: FeatureListProps) {
  const Icon = type === 'unique' ? Zap : Check;
  const iconColor = type === 'unique' ? 'text-yellow-500' : 'text-green-500';

  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Icon className={`h-4 w-4 mr-2 ${iconColor} mt-0.5`} />
          <span className="text-sm text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  );
}