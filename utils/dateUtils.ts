// utils/dateUtils.ts
export const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  export const daysBetween = (a: Date, b: Date): number => {
    return Math.floor((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000));
  };
  
  export const monthsBetween = (a: Date, b: Date): number => {
    return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  };
  
  export const isSameDay = (a: Date, b: Date): boolean => {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  };
  
  export const isNthWeekdayOfMonth = (date: Date, position: number, weekday: number): boolean => {
    if (date.getDay() !== weekday) return false;
  
    const month = date.getMonth();
    const year = date.getFullYear();
  
    if (position === -1) {
      // Last weekday of month
      const lastDay = new Date(year, month + 1, 0);
      let d = new Date(lastDay);
      while (d.getDay() !== weekday) {
        d.setDate(d.getDate() - 1);
      }
      return d.getDate() === date.getDate();
    }
  
    // Nth occurrence
    const firstOfMonth = new Date(year, month, 1);
    let firstWeekday = new Date(firstOfMonth);
    while (firstWeekday.getDay() !== weekday) {
      firstWeekday.setDate(firstWeekday.getDate() + 1);
    }
  
    firstWeekday.setDate(firstWeekday.getDate() + (position - 1) * 7);
    return firstWeekday.getMonth() === month && firstWeekday.getDate() === date.getDate();
  };
  
  export const isRecurringDate = (
    date: Date,
    startDate: Date,
    endDate: Date | null,
    recurringType: string,
    interval: number,
    weekDays: number[],
    monthDay: number,
    monthType: string,
    monthWeekday: { position: number; weekday: number }
  ): boolean => {
    if (date < startDate) return false;
    if (endDate && date > endDate) return false;
  
    switch (recurringType) {
      case 'daily': {
        const diff = daysBetween(startDate, date);
        return diff % interval === 0;
      }
  
      case 'weekly': {
        const weeksDiff = Math.floor(daysBetween(startDate, date) / 7);
        const sameWeekInterval = weeksDiff % interval === 0;
        const weekdayMatch = weekDays.includes(date.getDay());
        return sameWeekInterval && weekdayMatch;
      }
  
      case 'monthly': {
        const monthsDiff = monthsBetween(startDate, date);
        if (monthsDiff % interval !== 0) return false;
  
        if (monthType === 'date') {
          return date.getDate() === monthDay;
        }
  
        return isNthWeekdayOfMonth(date, monthWeekday.position, monthWeekday.weekday);
      }
  
      case 'yearly': {
        const yearsDiff = date.getFullYear() - startDate.getFullYear();
        if (yearsDiff % interval !== 0) return false;
        return date.getMonth() === startDate.getMonth() && date.getDate() === startDate.getDate();
      }
  
      default:
        return false;
    }
  };
  
  export const calculatePreviewDates = (
    startDate: Date,
    endDate: Date | null,
    recurringType: string,
    interval: number,
    weekDays: number[],
    monthDay: number,
    monthType: string,
    monthWeekday: { position: number; weekday: number }
  ): Date[] => {
    const output: Date[] = [];
    const until = endDate || new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    let cursor = new Date(startDate);
    let safety = 0;
  
    while (cursor <= until && output.length < 200 && safety < 2000) {
      if (isRecurringDate(cursor, startDate, endDate, recurringType, interval, weekDays, monthDay, monthType, monthWeekday)) {
        output.push(new Date(cursor));
      }
  
      cursor = new Date(cursor);
      cursor.setDate(cursor.getDate() + 1);
      safety++;
    }
  
    return output;
  };
  