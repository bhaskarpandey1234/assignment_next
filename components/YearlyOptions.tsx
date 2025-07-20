// components/YearlyOptions.tsx
import React from 'react';

interface YearlyOptionsProps {
  yearlyMonth: number;
  onYearlyMonthChange: (month: number) => void;
}

const YearlyOptions: React.FC<YearlyOptionsProps> = ({
  yearlyMonth,
  onYearlyMonthChange,
}) => {
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Month
      </h4>
      <select
        value={yearlyMonth}
        onChange={(e) => onYearlyMonthChange(parseInt(e.target.value, 10))}
        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearlyOptions;
