// components/UpcomingDates.tsx
import React from 'react';

interface UpcomingDatesProps {
  dates: Date[];
}

const UpcomingDates: React.FC<UpcomingDatesProps> = ({ dates }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatWeekday = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const upcomingFive = dates.slice(0, 5);

  if (upcomingFive.length === 0) {
    return (
      <div className="mt-6">
        <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Next 5 Occurrences
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No upcoming dates found
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Next 5 Occurrences
      </h4>
      <div className="space-y-2">
        {upcomingFive.map((date, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {formatDate(date)}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {formatWeekday(date)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDates;
