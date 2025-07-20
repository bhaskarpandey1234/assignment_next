// components/RecurrenceTypeSelector.tsx
import React from 'react';
import { useRecurring } from '@/context/RecurringContext';
import type { RecurringType } from '@/types/recurring';

const RecurrenceTypeSelector: React.FC = () => {
  const { recurringType, setRecurrenceType } = useRecurring();

  const types: { value: RecurringType; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Recurrence Type
      </label>
      <div className="grid grid-cols-4 gap-2">
        {types.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setRecurrenceType(value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              recurringType === value
                ? 'bg-teal-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecurrenceTypeSelector;
