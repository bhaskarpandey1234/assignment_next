// context/RecurringContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import type { 
  RecurringState, 
  RecurringActions, 
  RecurringHelpers, 
  RecurringType 
} from '@/types/recurring';

interface RecurringContextType extends RecurringState, RecurringActions, RecurringHelpers {}

const RecurringContext = createContext<RecurringContextType | undefined>(undefined);

// Utility function to calculate preview dates
const calculatePreviewDates = (state: RecurringState): Date[] => {
  const { recurringType, interval, weekDays, monthType, monthDay, monthWeekday, yearlyMonth, startDate, endDate } = state;
  const dates: Date[] = [];
  const maxDates = 50; // Limit to prevent performance issues
  
  let currentDate = new Date(startDate);
  const endLimit = endDate || new Date(startDate.getFullYear() + 2, startDate.getMonth(), startDate.getDate());

  while (dates.length < maxDates && currentDate <= endLimit) {
    switch (recurringType) {
      case 'daily':
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + interval);
        break;
        
      case 'weekly':
        if (weekDays.length === 0) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + (7 * interval));
        } else {
          // Handle multiple weekdays
          for (let i = 0; i < 7 * interval; i++) {
            if (weekDays.includes(currentDate.getDay())) {
              dates.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
        break;
        
      case 'monthly':
        if (monthType === 'day') {
          const targetDay = Math.min(monthDay, new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate());
          currentDate.setDate(targetDay);
          dates.push(new Date(currentDate));
          currentDate.setMonth(currentDate.getMonth() + interval);
        } else {
          // Handle nth weekday of month
          const { nth, day } = monthWeekday;
          const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const firstWeekday = firstDay.getDay();
          const targetDate = 1 + ((day - firstWeekday + 7) % 7) + (nth - 1) * 7;
          
          if (targetDate <= new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()) {
            currentDate.setDate(targetDate);
            dates.push(new Date(currentDate));
          }
          currentDate.setMonth(currentDate.getMonth() + interval);
        }
        break;
        
      case 'yearly':
        currentDate.setMonth(yearlyMonth);
        dates.push(new Date(currentDate));
        currentDate.setFullYear(currentDate.getFullYear() + interval);
        break;
    }
  }

  return dates;
};

// Helper function to generate pattern description
const generatePatternDescription = (state: RecurringState): string => {
  const { recurringType, interval, weekDays, monthType, monthDay, monthWeekday, yearlyMonth } = state;
  
  switch (recurringType) {
    case 'daily':
      return interval === 1 ? 'Every day' : `Every ${interval} days`;
      
    case 'weekly':
      if (weekDays.length === 0) {
        return interval === 1 ? 'Every week' : `Every ${interval} weeks`;
      }
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const selectedDays = weekDays.map(d => dayNames[d]).join(', ');
      return interval === 1 ? `Every week on ${selectedDays}` : `Every ${interval} weeks on ${selectedDays}`;
      
    case 'monthly':
      if (monthType === 'day') {
        return interval === 1 ? `Monthly on day ${monthDay}` : `Every ${interval} months on day ${monthDay}`;
      } else {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const nthWords = ['', 'first', 'second', 'third', 'fourth', 'fifth'];
        return interval === 1 
          ? `Monthly on the ${nthWords[monthWeekday.nth]} ${dayNames[monthWeekday.day]}`
          : `Every ${interval} months on the ${nthWords[monthWeekday.nth]} ${dayNames[monthWeekday.day]}`;
      }
      
    case 'yearly':
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return interval === 1 ? `Yearly in ${monthNames[yearlyMonth]}` : `Every ${interval} years in ${monthNames[yearlyMonth]}`;
      
    default:
      return 'No pattern selected';
  }
};

const defaultStartDate = new Date();
defaultStartDate.setHours(0, 0, 0, 0);

const initialState: RecurringState = {
  recurringType: 'daily',
  interval: 1,
  weekDays: [],
  monthType: 'day',
  monthDay: 1,
  monthWeekday: { nth: 1, day: 1 },
  yearlyMonth: 0,
  startDate: defaultStartDate,
  endDate: null,
  currentCalendarDate: new Date(defaultStartDate),
  previewDates: [],
  isLoading: false,
};

export const RecurringProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<RecurringState>(initialState);

  // Actions
  const setRecurrenceType = useCallback((type: RecurringType) => {
    setState(prev => ({ ...prev, recurringType: type }));
  }, []);

  const setInterval = useCallback((interval: number) => {
    setState(prev => ({ ...prev, interval: Math.max(1, interval) }));
  }, []);

  const toggleWeekday = useCallback((day: number) => {
    setState(prev => ({
      ...prev,
      weekDays: prev.weekDays.includes(day)
        ? prev.weekDays.filter(d => d !== day)
        : [...prev.weekDays, day].sort(),
    }));
  }, []);

  const setMonthType = useCallback((type: 'day' | 'weekday') => {
    setState(prev => ({ ...prev, monthType: type }));
  }, []);

  const setMonthDay = useCallback((day: number) => {
    setState(prev => ({ ...prev, monthDay: Math.max(1, Math.min(31, day)) }));
  }, []);

  const setMonthWeekday = useCallback((weekday: { nth: number; day: number }) => {
    setState(prev => ({ ...prev, monthWeekday: weekday }));
  }, []);

  const setYearlyMonth = useCallback((month: number) => {
    setState(prev => ({ ...prev, yearlyMonth: Math.max(0, Math.min(11, month)) }));
  }, []);

  const setStartDate = useCallback((date: Date) => {
    setState(prev => ({ ...prev, startDate: new Date(date) }));
  }, []);

  const setEndDate = useCallback((date: Date | null) => {
    setState(prev => ({ ...prev, endDate: date ? new Date(date) : null }));
  }, []);

  const setCurrentCalendarDate = useCallback((date: Date) => {
    setState(prev => ({ ...prev, currentCalendarDate: new Date(date) }));
  }, []);

  // Helpers
  const getPatternDescription = useCallback(() => {
    return generatePatternDescription(state);
  }, [state]);

  const exportAsJSON = useCallback(() => {
    const exportData = {
      recurringType: state.recurringType,
      interval: state.interval,
      weekDays: state.weekDays,
      monthType: state.monthType,
      monthDay: state.monthDay,
      monthWeekday: state.monthWeekday,
      yearlyMonth: state.yearlyMonth,
      startDate: state.startDate.toISOString(),
      endDate: state.endDate?.toISOString() || null,
      description: getPatternDescription(),
    };
    return JSON.stringify(exportData, null, 2);
  }, [state, getPatternDescription]);

  const exportAsRRULE = useCallback(() => {
    const { recurringType, interval, weekDays, monthType, monthDay, monthWeekday, yearlyMonth, startDate, endDate } = state;
    
    let rrule = `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
    rrule += 'RRULE:';

    switch (recurringType) {
      case 'daily':
        rrule += `FREQ=DAILY;INTERVAL=${interval}`;
        break;
      case 'weekly':
        rrule += `FREQ=WEEKLY;INTERVAL=${interval}`;
        if (weekDays.length > 0) {
          const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
          rrule += `;BYDAY=${weekDays.map(d => days[d]).join(',')}`;
        }
        break;
      case 'monthly':
        rrule += `FREQ=MONTHLY;INTERVAL=${interval}`;
        if (monthType === 'day') {
          rrule += `;BYMONTHDAY=${monthDay}`;
        } else {
          const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
          rrule += `;BYDAY=${monthWeekday.nth}${days[monthWeekday.day]}`;
        }
        break;
      case 'yearly':
        rrule += `FREQ=YEARLY;INTERVAL=${interval};BYMONTH=${yearlyMonth + 1}`;
        break;
    }

    if (endDate) {
      rrule += `;UNTIL=${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
    }

    return rrule;
  }, [state]);

  // Calculate preview dates when relevant state changes
  useEffect(() => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    const timeoutId = setTimeout(() => {
      const newPreviewDates = calculatePreviewDates(state);
      setState(prev => ({ 
        ...prev, 
        previewDates: newPreviewDates,
        isLoading: false 
      }));
    }, 100); // Small delay to prevent excessive calculations

    return () => clearTimeout(timeoutId);
  }, [
    state.recurringType,
    state.interval,
    state.weekDays,
    state.monthType,
    state.monthDay,
    state.monthWeekday,
    state.yearlyMonth,
    state.startDate,
    state.endDate,
  ]);

  // Memoized context value
  const value = useMemo<RecurringContextType>(
    () => ({
      ...state,
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
    }),
    [
      state,
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
    ]
  );

  return (
    <RecurringContext.Provider value={value}>
      {children}
    </RecurringContext.Provider>
  );
};

export const useRecurring = () => {
  const context = useContext(RecurringContext);
  if (!context) {
    throw new Error('useRecurring must be used within a RecurringProvider');
  }
  return context;
};
