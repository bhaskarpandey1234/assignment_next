"use client";

import React, { useState, useEffect } from "react";
import { useRecurring } from "@/context/RecurringContext";
import RecurrenceTypeSelector from "./RecurrenceTypeSelector";
import IntervalSelector from "./IntervalSelector";
import WeekdaySelector from "./WeekdaySelector";
import MonthlyOptions from "./MonthlyOptions";
import YearlyOptions from "./YearlyOptions";
import DateRangeSelector from "./DateRangeSelector";
import PatternDescription from "./PatternDescription";
import CalendarPreview from "./CalendarPreview";
import UpcomingDates from "./UpcomingDates";
import ExportOptions from "./ExportOptions";

const RecurringDatePicker: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const {
    recurringType,
    interval,
    weekDays,
    monthType,
    monthDay,
    monthWeekday,
    yearlyMonth,
    startDate,
    endDate,
    currentCalendarDate,
    previewDates,
    setRecurrenceType,
    setInterval,
    toggleWeekday,
    setMonthType,
    setMonthDay,
    setMonthWeekday,
    setYearlyMonth,
    setStartDate,
    setEndDate,
    setCurrentCalendarDate,
    getPatternDescription,
    exportAsJSON,
    exportAsRRULE,
  } = useRecurring();

  // Ensure component only renders after client hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Create navigation handlers for the calendar
  const handlePrevMonth = () => {
    if (!isMounted) return;
    const prevMonth = new Date(currentCalendarDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentCalendarDate(prevMonth);
  };

  const handleNextMonth = () => {
    if (!isMounted) return;
    const nextMonth = new Date(currentCalendarDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentCalendarDate(nextMonth);
  };

  // Show loading skeleton during server-side rendering
  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Column - Configuration Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pattern Description Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>

          {/* Recurrence Options Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse space-y-4">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Date Range Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse space-y-4">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>

          {/* Export Options Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse space-y-4">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="flex gap-3">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview Skeleton */}
        <div className="space-y-6">
          {/* Calendar Preview Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse">
              <div className="flex justify-between items-center mb-4">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 42 }, (_, i) => (
                  <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Dates Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="animate-pulse space-y-3">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render full component after client hydration
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Left Column - Configuration */}
      <div className="lg:col-span-2 space-y-6">
        {/* Pattern Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <PatternDescription
            description={getPatternDescription()}
            recurringType={recurringType}
          />
        </div>

        {/* Recurrence Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recurrence Pattern
          </h3>

          <div className="space-y-6">
            <RecurrenceTypeSelector
              selectedType={recurringType}
              onTypeChange={setRecurrenceType}
            />

            <IntervalSelector
              interval={interval}
              recurringType={recurringType}
              onIntervalChange={setInterval}
            />

            {/* Conditional Options */}
            {recurringType === "weekly" && (
              <WeekdaySelector
                selectedDays={weekDays}
                onToggleDay={toggleWeekday}
              />
            )}

            {recurringType === "monthly" && (
              <MonthlyOptions
                monthType={monthType}
                monthDay={monthDay}
                monthWeekday={monthWeekday}
                onMonthTypeChange={setMonthType}
                onMonthDayChange={setMonthDay}
                onMonthWeekdayChange={setMonthWeekday}
              />
            )}

            {recurringType === "yearly" && (
              <YearlyOptions
                yearlyMonth={yearlyMonth}
                onYearlyMonthChange={setYearlyMonth}
              />
            )}
          </div>
        </div>

        {/* Date Range */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Date Range
          </h3>

          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        </div>

        {/* Export Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <ExportOptions
            onExportJSON={exportAsJSON}
            onExportRRULE={exportAsRRULE}
          />
        </div>
      </div>

      {/* Right Column - Preview */}
      <div className="space-y-6">
        {/* Calendar Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Preview
          </h3>

          <CalendarPreview
            currentDate={currentCalendarDate}
            previewDates={previewDates}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        </div>

        {/* Upcoming Dates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <UpcomingDates dates={previewDates.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;
