import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CompetitorLoaderProps {
  onComplete: () => void;
}

const competitorNames = [
  'Analyzing market leaders...',
  'Scanning industry data...',
  'Identifying key players...',
  'Processing competitor profiles...',
  'Evaluating market presence...',
  'Gathering competitive insights...',
];

export default function CompetitorLoader({ onComplete }: CompetitorLoaderProps) {
  const [currentText, setCurrentText] = useState(competitorNames[0]);
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % competitorNames.length;
      setCurrentText(competitorNames[currentIndex]);
    }, 1500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
      <p className="text-lg text-gray-600 animate-pulse">{currentText}</p>
    </div>
  );
}