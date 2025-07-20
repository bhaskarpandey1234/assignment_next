// components/MonthlyOptions.tsx
'use client';

import React from 'react';

interface MonthlyOptionsProps {
  monthType: 'date' | 'weekday';
  monthDay: number;
  monthWeekday: { position: number; weekday: number };
  onMonthTypeChange: (type: 'date' | 'weekday') => void;
  onMonthDayChange: (day: number) => void;
  onMonthWeekdayChange: (position: number, weekday: number) => void;
}

const positions = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: -1, label: 'Last' },
];

const weekdays = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

const MonthlyOptions: React.FC<MonthlyOptionsProps> = ({
  monthType,
  monthDay,
  monthWeekday,
  onMonthTypeChange,
  onMonthDayChange,
  onMonthWeekdayChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Monthly Pattern
      </label>

      <div className="space-y-4">
        {/* Date option */}
        <div className="flex items-center gap-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="monthType"
              value="date"
              checked={monthType === 'date'}
              onChange={(e) => onMonthTypeChange(e.target.value as 'date')}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              On day
            </span>
          </label>

          <input
            type="number"
            min="1"
            max="31"
            value={monthDay}
            onChange={(e) => onMonthDayChange(parseInt(e.target.value, 10) || 1)}
            disabled={monthType !== 'date'}
            className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 focus-ring"
          />

          <span className="text-sm text-gray-600 dark:text-gray-400">
            of the month
          </span>
        </div>

        {/* Weekday option */}
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="monthType"
              value="weekday"
              checked={monthType === 'weekday'}
              onChange={(e) => onMonthTypeChange(e.target.value as 'weekday')}
              className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              On the
            </span>
          </label>

          <select
            value={monthWeekday.position}
            onChange={(e) => onMonthWeekdayChange(parseInt(e.target.value, 10), monthWeekday.weekday)}
            disabled={monthType !== 'weekday'}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 focus-ring"
          >
            {positions.map((pos) => (
              <option key={pos.value} value={pos.value}>
                {pos.label}
              </option>
            ))}
          </select>

          <select
            value={monthWeekday.weekday}
            onChange={(e) => onMonthWeekdayChange(monthWeekday.position, parseInt(e.target.value, 10))}
            disabled={monthType !== 'weekday'}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 focus-ring"
          >
            {weekdays.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>

          <span className="text-sm text-gray-600 dark:text-gray-400">
            of the month
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyOptions;
