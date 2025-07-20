// hooks/useRecurringDates.ts
'use client';

import { useState, useCallback, useEffect } from 'react';
import { RecurrenceState, RecurrenceType, ExportData } from '../types';
import { calculatePreviewDates, formatDateForInput } from '../utils/dateUtils';
import { generateRRULE, generatePatternDescription } from '../utils/rruleUtils';

const initialState: RecurrenceState = {
  recurringType: 'daily',
  interval: 1,
  weekDays: [1], // Monday by default
  monthDay: 15,
  monthType: 'date',
  monthWeekday: { position: 1, weekday: 1 },
  yearlyMonth: 7,
  startDate: new Date('2025-07-21'),
  endDate: null,
  currentCalendarDate: new Date('2025-07-01'),
  previewDates: []
};

export const useRecurringDates = () => {
  const [state, setState] = useState<RecurrenceState>(initialState);

  const updatePreviewDates = useCallback(() => {
    const previewDates = calculatePreviewDates(
      state.startDate,
      state.endDate,
      state.recurringType,
      state.interval,
      state.weekDays,
      state.monthDay,
      state.monthType,
      state.monthWeekday
    );

    setState(prev => ({ ...prev, previewDates }));
  }, [state.startDate, state.endDate, state.recurringType, state.interval, 
      state.weekDays, state.monthDay, state.monthType, state.monthWeekday]);

  useEffect(() => {
    updatePreviewDates();
  }, [updatePreviewDates]);

  const setRecurrenceType = useCallback((type: RecurrenceType) => {
    setState(prev => {
      const newState = { ...prev, recurringType: type };

      // Set defaults for specific types
      if (type === 'weekly' && prev.weekDays.length === 0) {
        newState.weekDays = [1]; // Monday default
      }

      if (type === 'yearly') {
        newState.yearlyMonth = prev.startDate.getMonth() + 1;
      }

      return newState;
    });
  }, []);

  const setInterval = useCallback((interval: number) => {
    setState(prev => ({ ...prev, interval: Math.max(1, interval) }));
  }, []);

  const toggleWeekday = useCallback((day: number) => {
    setState(prev => {
      const weekDays = [...prev.weekDays];
      const index = weekDays.indexOf(day);

      if (index >= 0) {
        weekDays.splice(index, 1);
      } else {
        weekDays.push(day);
      }

      weekDays.sort((a, b) => a - b);
      return { ...prev, weekDays };
    });
  }, []);

  const setMonthDay = useCallback((monthDay: number) => {
    setState(prev => ({ 
      ...prev, 
      monthDay: Math.min(Math.max(monthDay, 1), 31) 
    }));
  }, []);

  const setMonthType = useCallback((monthType: 'date' | 'weekday') => {
    setState(prev => ({ ...prev, monthType }));
  }, []);

  const setMonthWeekday = useCallback((position: number, weekday: number) => {
    setState(prev => ({ 
      ...prev, 
      monthWeekday: { position, weekday } 
    }));
  }, []);

  const setYearlyMonth = useCallback((yearlyMonth: number) => {
    setState(prev => ({ ...prev, yearlyMonth }));
  }, []);

  const setStartDate = useCallback((startDate: Date) => {
    setState(prev => {
      const newState = { ...prev, startDate };

      // Keep yearly month in sync if yearly selected
      if (prev.recurringType === 'yearly') {
        newState.yearlyMonth = startDate.getMonth() + 1;
      }

      return newState;
    });
  }, []);

  const setEndDate = useCallback((endDate: Date | null) => {
    setState(prev => ({ ...prev, endDate }));
  }, []);

  const setCurrentCalendarDate = useCallback((currentCalendarDate: Date) => {
    setState(prev => ({ ...prev, currentCalendarDate }));
  }, []);

  const getPatternDescription = useCallback(() => {
    return generatePatternDescription(state);
  }, [state]);

  const exportAsJSON = useCallback((): ExportData => {
    return {
      recurringType: state.recurringType,
      interval: state.interval,
      weekDays: [...state.weekDays],
      monthDay: state.monthDay,
      monthType: state.monthType,
      monthWeekday: { ...state.monthWeekday },
      yearlyMonth: state.yearlyMonth,
      startDate: formatDateForInput(state.startDate),
      endDate: state.endDate ? formatDateForInput(state.endDate) : null,
      description: generatePatternDescription(state),
      nextOccurrences: state.previewDates
        .slice(0, 10)
        .map(d => formatDateForInput(d))
    };
  }, [state]);

  const exportAsRRULE = useCallback((): string => {
    return generateRRULE(state);
  }, [state]);

  return {
    state,
    actions: {
      setRecurrenceType,
      setInterval,
      toggleWeekday,
      setMonthDay,
      setMonthType,
      setMonthWeekday,
      setYearlyMonth,
      setStartDate,
      setEndDate,
      setCurrentCalendarDate
    },
    helpers: {
      getPatternDescription,
      exportAsJSON,
      exportAsRRULE
    }
  };
};
