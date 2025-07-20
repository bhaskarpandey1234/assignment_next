// hooks/useCalendar.ts
'use client';

import { useState, useCallback, useMemo } from 'react';
import { isSameDay } from '../utils/dateUtils';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isRecurring: boolean;
}

export const useCalendar = (
  currentDate: Date,
  recurringDates: Date[]
) => {
  const [calendarDate, setCalendarDate] = useState(currentDate);

  const calendarData = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const today = new Date();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay(); // 0 = Sunday

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Previous month details
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const days: CalendarDay[] = [];

    // Previous month filler days
    for (let i = startOffset - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, today),
        isRecurring: recurringDates.some(rd => isSameDay(rd, date))
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
        isRecurring: recurringDates.some(rd => isSameDay(rd, date))
      });
    }

    // Next month filler days
    const totalCells = 42; // 6 weeks × 7 days
    const remainingCells = totalCells - days.length;

    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, today),
        isRecurring: recurringDates.some(rd => isSameDay(rd, date))
      });
    }

    return days;
  }, [calendarDate, recurringDates]);

  const monthLabel = useMemo(() => {
    return calendarDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }, [calendarDate]);

  const goToPreviousMonth = useCallback(() => {
    setCalendarDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCalendarDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  return {
    calendarData,
    monthLabel,
    goToPreviousMonth,
    goToNextMonth,
    setCalendarDate
  };
};
