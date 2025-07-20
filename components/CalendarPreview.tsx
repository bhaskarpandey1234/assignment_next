// components/CalendarPreview.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarPreviewProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  previewDates: Date[];
}

const CalendarPreview: React.FC<CalendarPreviewProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  previewDates,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const today = new Date();

  const isRecurringDate = (date: Date): boolean => {
    if (!previewDates || !Array.isArray(previewDates)) {
      return false;
    }
    return previewDates.some(
      (previewDate) =>
        previewDate.getDate() === date.getDate() &&
        previewDate.getMonth() === date.getMonth() &&
        previewDate.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();

    // Previous month's days
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(prevYear, prevMonth, day);
      days.push(
        <div
          key={`prev-${day}`}
          className="h-8 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500"
        >
          {day}
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isRecurring = isRecurringDate(date);
      const isTodayDate = isToday(date);

      days.push(
        <div
          key={day}
          className={`
            h-8 flex items-center justify-center text-xs rounded cursor-pointer
            transition-colors duration-200
            ${isTodayDate ? "bg-gray-200 dark:bg-gray-700 font-medium" : ""}
            ${
              isRecurring
                ? "bg-teal-500 text-white font-bold"
                : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            }
          `}
        >
          {day}
        </div>
      );
    }

    // Next month's days to fill the grid
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      days.push(
        <div
          key={`next-${day}`}
          className="h-8 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500"
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Preview
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevMonth}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[120px] text-center">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={onNextMonth}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarPreview;
