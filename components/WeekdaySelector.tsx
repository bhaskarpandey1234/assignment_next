// components/WeekdaySelector.tsx
'use client';

import React from 'react';

interface WeekdaySelectorProps {
  selectedDays: number[];
  onToggleDay: (day: number) => void;
}

const weekdays = [
  { value: 0, short: 'Sun', full: 'Sunday' },
  { value: 1, short: 'Mon', full: 'Monday' },
  { value: 2, short: 'Tue', full: 'Tuesday' },
  { value: 3, short: 'Wed', full: 'Wednesday' },
  { value: 4, short: 'Thu', full: 'Thursday' },
  { value: 5, short: 'Fri', full: 'Friday' },
  { value: 6, short: 'Sat', full: 'Saturday' },
];

const WeekdaySelector: React.FC<WeekdaySelectorProps> = ({
  selectedDays,
  onToggleDay,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        On these days
      </label>

      <div className="flex flex-wrap gap-2">
        {weekdays.map((day) => (
          <button
            key={day.value}
            onClick={() => onToggleDay(day.value)}
            className={`w-12 h-12 rounded-full text-sm font-medium transition-all duration-200 focus-ring ${
              selectedDays.includes(day.value)
                ? 'bg-blue-500 text-white shadow-md transform scale-105'
                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
            }`}
            type="button"
            title={day.full}
          >
            {day.short}
          </button>
        ))}
      </div>

      {selectedDays.length === 0 && (
        <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
          Please select at least one day
        </p>
      )}
    </div>
  );
};

export default WeekdaySelector;
