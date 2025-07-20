// components/DateRangeSelector.tsx
'use client';

import React from 'react';
import { formatDateForInput } from '../utils/dateUtils';

interface DateRangeSelectorProps {
  startDate: Date;
  endDate: Date | null;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      onStartDateChange(date);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const date = new Date(e.target.value);
      if (!isNaN(date.getTime())) {
        onEndDateChange(date);
      }
    } else {
      onEndDateChange(null);
    }
  };

  const clearEndDate = () => {
    onEndDateChange(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Start Date
        </label>
        <input
          type="date"
          value={formatDateForInput(startDate)}
          onChange={handleStartDateChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          End Date (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            value={endDate ? formatDateForInput(endDate) : ''}
            onChange={handleEndDateChange}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus-ring"
          />
          {endDate && (
            <button
              onClick={clearEndDate}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 focus-ring"
              type="button"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;
