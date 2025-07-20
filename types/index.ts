// types/index.ts
export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceState {
  recurringType: RecurrenceType;
  interval: number;
  weekDays: number[];
  monthDay: number;
  monthType: 'date' | 'weekday';
  monthWeekday: {
    position: number;
    weekday: number;
  };
  yearlyMonth: number;
  startDate: Date;
  endDate: Date | null;
  currentCalendarDate: Date;
  previewDates: Date[];
}

export interface WeekdayOption {
  value: number;
  label: string;
  short: string;
}

export interface PositionOption {
  value: number;
  label: string;
}

export interface MonthOption {
  value: number;
  label: string;
}

export interface RecurrencePatterns {
  daily: {
    label: string;
    intervals: number[];
  };
  weekly: {
    label: string;
    intervals: number[];
    weekdays: WeekdayOption[];
  };
  monthly: {
    label: string;
    intervals: number[];
    positions: PositionOption[];
  };
  yearly: {
    label: string;
    intervals: number[];
    months: MonthOption[];
  };
}

export interface ExportData {
  recurringType: RecurrenceType;
  interval: number;
  weekDays: number[];
  monthDay: number;
  monthType: 'date' | 'weekday';
  monthWeekday: {
    position: number;
    weekday: number;
  };
  yearlyMonth: number;
  startDate: string;
  endDate: string | null;
  description: string;
  nextOccurrences: string[];
}
