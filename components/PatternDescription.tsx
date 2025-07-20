// components/PatternDescription.tsx
import React from 'react';
import { CalendarDays } from 'lucide-react';

interface PatternDescriptionProps {
  description: string;
}

const PatternDescription: React.FC<PatternDescriptionProps> = ({ description }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex items-center justify-center w-10 h-10 bg-teal-500 text-white rounded-full flex-shrink-0">
        <CalendarDays className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PatternDescription;
