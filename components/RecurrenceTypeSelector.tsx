// components/RecurrenceTypeSelector.tsx
'use client';

import React from 'react';
import { RecurrenceType } from '../types';

interface RecurrenceTypeSelectorProps {
  selectedType: RecurrenceType;
  onTypeChange: (type: RecurrenceType) => void;
}

const recurrenceTypes: Array<{
  type: RecurrenceType;
  label: string;
  icon: string;
}> = [
  { type: 'daily', label: 'Daily', icon: '📅' },
  { type: 'weekly', label: 'Weekly', icon: '📊' },
  { type: 'monthly', label: 'Monthly', icon: '🗓️' },
  { type: 'yearly', label: 'Yearly', icon: '📆' },
];

const RecurrenceTypeSelector: React.FC<RecurrenceTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Recurrence Type
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {recurrenceTypes.map(({ type, label, icon }) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 focus-ring ${
              selectedType === type
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            type="button"
          >
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecurrenceTypeSelector;
