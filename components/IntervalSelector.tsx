// components/IntervalSelector.tsx
'use client';

import React from 'react';
import { RecurrenceType } from '../types';

interface IntervalSelectorProps {
  interval: number;
  recurringType: RecurrenceType;
  onIntervalChange: (interval: number) => void;
}

const IntervalSelector: React.FC<IntervalSelectorProps> = ({
  interval,
  recurringType,
  onIntervalChange,
}) => {
  const unitLabels = {
    daily: 'day(s)',
    weekly: 'week(s)',
    monthly: 'month(s)',
    yearly: 'year(s)',
  };

  const maxIntervals = {
    daily: 7,
    weekly: 4,
    monthly: 12,
    yearly: 5,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      onIntervalChange(Math.min(value, maxIntervals[recurringType]));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Repeat Interval
      </label>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">Every</span>

        <input
          type="number"
          min="1"
          max={maxIntervals[recurringType]}
          value={interval}
          onChange={handleChange}
          className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
        />

        <span className="text-sm text-gray-600 dark:text-gray-400">
          {unitLabels[recurringType]}
        </span>
      </div>
    </div>
  );
};

export default IntervalSelector;
