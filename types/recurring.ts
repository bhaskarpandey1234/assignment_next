// types/recurring.ts
export type RecurringType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurringState {
  recurringType: RecurringType;
  interval: number;
  weekDays: number[]; // 0-6 (Sunday to Saturday)
  monthType: 'day' | 'weekday';
  monthDay: number; // 1-31
  monthWeekday: { nth: number; day: number }; // e.g. 2nd Monday = { nth: 2, day: 1 }
  yearlyMonth: number; // 0-11 (January to December)
  startDate: Date;
  endDate: Date | null;
  currentCalendarDate: Date;
  previewDates: Date[];
  isLoading: boolean;
}

export interface RecurringActions {
  setRecurrenceType: (type: RecurringType) => void;
  setInterval: (interval: number) => void;
  toggleWeekday: (day: number) => void;
  setMonthType: (type: 'day' | 'weekday') => void;
  setMonthDay: (day: number) => void;
  setMonthWeekday: (weekday: { nth: number; day: number }) => void;
  setYearlyMonth: (month: number) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
  setCurrentCalendarDate: (date: Date) => void;
}

export interface RecurringHelpers {
  getPatternDescription: () => string;
  exportAsJSON: () => string;
  exportAsRRULE: () => string;
}
