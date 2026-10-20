export interface TimeConstraints {
  /** Inclusive local clock bounds. A minimum later than the maximum permits an overnight interval. */
  minTime?: Date;
  maxTime?: Date;
  /** Allowed minute marks within each hour, from 1 through 60. Defaults to 1. */
  minuteStep?: number;
}

export const clockMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();
export const minuteStep = (constraints: TimeConstraints) =>
  Math.max(1, Math.min(60, Math.floor(constraints.minuteStep || 1)));

export function isTimeUnavailable(date: Date, constraints: TimeConstraints) {
  const value = clockMinutes(date);
  const minimum = constraints.minTime ? clockMinutes(constraints.minTime) : 0;
  const maximum = constraints.maxTime ? clockMinutes(constraints.maxTime) : 1439;
  const outside = minimum <= maximum ? value < minimum || value > maximum : value < minimum && value > maximum;
  return outside || date.getMinutes() % minuteStep(constraints) !== 0;
}

/** Find an allowed clock time without changing the date or seconds carried by the caller. */
export function constrainTime(date: Date, constraints: TimeConstraints, direction?: -1 | 1) {
  if (!isTimeUnavailable(date, constraints)) return date;
  const start = clockMinutes(date);
  for (let distance = 1; distance < 1440; distance += 1) {
    const offsets = direction ? [distance * direction] : [-distance, distance];
    for (const offset of offsets) {
      const candidate = new Date(date.getTime());
      const minutes = (start + offset + 1440) % 1440;
      candidate.setHours(Math.floor(minutes / 60), minutes % 60);
      if (!isTimeUnavailable(candidate, constraints)) return candidate;
    }
  }
  return date;
}
