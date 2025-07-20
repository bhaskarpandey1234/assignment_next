"use client";

import React, { useState, useEffect } from "react";
import { useRecurringDates } from "../hooks/useRecurringDates";
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
  const { state, actions, helpers } = useRecurringDates();
  // State to track hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handlers for navigating months
  const handlePrevMonth = () => {
    const newDate = new Date(state.currentCalendarDate);
    newDate.setMonth(newDate.getMonth() - 1);
    actions.setCurrentCalendarDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(state.currentCalendarDate);
    newDate.setMonth(newDate.getMonth() + 1);
    actions.setCurrentCalendarDate(newDate);
  };

  if (!isMounted) return null; // Wait for client-side

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* Left Column - Configuration */}
      <div className="lg:col-span-2 space-y-6">
        {/* Pattern Description */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <PatternDescription
            description={helpers.getPatternDescription()}
            recurringType={state.recurringType}
          />
        </div>

        {/* Recurrence Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recurrence Pattern
          </h3>
          <div className="space-y-6">
            <RecurrenceTypeSelector
              selectedType={state.recurringType}
              onTypeChange={actions.setRecurrenceType}
            />
            <IntervalSelector
              interval={state.interval}
              recurringType={state.recurringType}
              onIntervalChange={actions.setInterval}
            />
            {state.recurringType === "weekly" && (
              <WeekdaySelector
                selectedDays={state.weekDays}
                onToggleDay={actions.toggleWeekday}
              />
            )}
            {state.recurringType === "monthly" && (
              <MonthlyOptions
                monthType={state.monthType}
                monthDay={state.monthDay}
                monthWeekday={state.monthWeekday}
                onMonthTypeChange={actions.setMonthType}
                onMonthDayChange={actions.setMonthDay}
                onMonthWeekdayChange={actions.setMonthWeekday}
              />
            )}
            {state.recurringType === "yearly" && (
              <YearlyOptions
                yearlyMonth={state.yearlyMonth}
                onYearlyMonthChange={actions.setYearlyMonth}
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
            startDate={state.startDate}
            endDate={state.endDate}
            onStartDateChange={actions.setStartDate}
            onEndDateChange={actions.setEndDate}
          />
        </div>

        {/* Export Options */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <ExportOptions
            onExportJSON={helpers.exportAsJSON}
            onExportRRULE={helpers.exportAsRRULE}
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
            currentDate={state.currentCalendarDate}
            previewDates={state.previewDates ?? []}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        </div>

        {/* Upcoming Dates */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <UpcomingDates dates={state.previewDates?.slice(0, 5) ?? []} />
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;
