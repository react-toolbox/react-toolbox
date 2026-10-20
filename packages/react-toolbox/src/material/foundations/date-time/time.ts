/** Clock-only helpers deliberately exclude calendar locale data. */
export type TimeFormat = '24hr' | 'ampm';

export function getTimeMode(date: Date): 'am' | 'pm' {
  return date.getHours() >= 12 ? 'pm' : 'am';
}

export function setHours(date: Date, hours: number): Date {
  const next = new Date(date.getTime());
  next.setHours(hours);
  return next;
}

export function setMinutes(date: Date, minutes: number): Date {
  const next = new Date(date.getTime());
  next.setMinutes(minutes);
  return next;
}

export function formatTime(date: Date, format: TimeFormat): string {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  if (format === 'ampm')
    return `${hours % 12 || 12}${minutes === '00' ? '' : `:${minutes}`} ${hours < 12 ? 'am' : 'pm'}`;
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}
