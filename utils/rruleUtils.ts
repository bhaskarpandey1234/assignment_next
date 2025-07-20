// utils/rruleUtils.ts
import { RecurrenceState } from '../types';

export const generateRRULE = (state: RecurrenceState): string => {
  const freqMap = { 
    daily: 'DAILY', 
    weekly: 'WEEKLY', 
    monthly: 'MONTHLY', 
    yearly: 'YEARLY' 
  };

  let rule = `FREQ=${freqMap[state.recurringType]}`;

  if (state.interval > 1) {
    rule += `;INTERVAL=${state.interval}`;
  }

  if (state.recurringType === 'weekly' && state.weekDays.length) {
    const dayMap = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    rule += `;BYDAY=${state.weekDays.map(d => dayMap[d]).join(',')}`;
  }

  if (state.recurringType === 'monthly') {
    if (state.monthType === 'date') {
      rule += `;BYMONTHDAY=${state.monthDay}`;
    } else {
      const dayMap = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
      rule += `;BYDAY=${state.monthWeekday.position}${dayMap[state.monthWeekday.weekday]}`;
    }
  }

  if (state.recurringType === 'yearly') {
    rule += `;BYMONTH=${state.yearlyMonth};BYMONTHDAY=${state.startDate.getDate()}`;
  }

  if (state.endDate) {
    const endDateStr = state.endDate.toISOString().replace(/[-:]/g, '').split('T')[0];
    rule += `;UNTIL=${endDateStr}`;
  }

  const dtStart = state.startDate.toISOString().replace(/[-:]/g, '').split('T')[0];
  return `DTSTART:${dtStart}\nRRULE:${rule}`;
};

export const generatePatternDescription = (state: RecurrenceState): string => {
  const { recurringType, interval } = state;
  const startStr = state.startDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  let text = '';

  switch (recurringType) {
    case 'daily':
      text = interval === 1 ? 'Every day' : `Every ${interval} days`;
      break;

    case 'weekly': {
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayNames = state.weekDays.map(d => weekdays[d]);
      const intervalTxt = interval === 1 ? 'every week' : `every ${interval} weeks`;

      if (dayNames.length === 1) {
        text = `Every ${dayNames[0]} ${intervalTxt}`;
      } else if (dayNames.length === 2) {
        text = `Every ${dayNames.join(' and ')} ${intervalTxt}`;
      } else if (dayNames.length > 2) {
        const lastDay = dayNames.pop();
        text = `Every ${dayNames.join(', ')}, and ${lastDay} ${intervalTxt}`;
      } else {
        text = `No days selected ${intervalTxt}`;
      }
      break;
    }

    case 'monthly': {
      const intervalTxt = interval === 1 ? 'month' : `${interval} months`;

      if (state.monthType === 'date') {
        text = `On day ${state.monthDay} of every ${intervalTxt}`;
      } else {
        const positions = ['First', 'Second', 'Third', 'Fourth', 'Last'];
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const posLabel = positions[state.monthWeekday.position === -1 ? 4 : state.monthWeekday.position - 1];
        const weekdayLabel = weekdays[state.monthWeekday.weekday];
        text = `On the ${posLabel} ${weekdayLabel} of every ${intervalTxt}`;
      }
      break;
    }

    case 'yearly': {
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
      const monthLabel = months[state.yearlyMonth - 1];
      const intervalTxt = interval === 1 ? 'year' : `${interval} years`;
      text = `Every ${monthLabel} ${state.startDate.getDate()} of every ${intervalTxt}`;
      break;
    }
  }

  const endTxt = state.endDate
    ? `, ending ${state.endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
    : '';

  return `${text} starting ${startStr}${endTxt}`;
};
