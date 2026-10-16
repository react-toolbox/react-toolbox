'use client';
import { useState } from 'react';
import { CalendarSelection, type DateRange } from 'react-toolbox/date-picker';

export default function CalendarComposition() {
  const [range, setRange] = useState<DateRange>({ from: undefined, to: undefined });
  return (
    <div>
      <CalendarSelection
        mode="range"
        value={range}
        onValueChange={setRange}
        defaultMonth={new Date(2026, 9, 1)}
        numberOfMonths={2}
        showWeekNumbers
        clearable
        isDateUnavailable={(date) => date.getDay() === 0}
        excludeUnavailable
      />
      <p role="status" className="mt-4 text-toolbox-body">
        {range.from
          ? `${range.from.toLocaleDateString()}${range.to ? ` – ${range.to.toLocaleDateString()}` : ' – choose an end date'}`
          : 'Choose a visit range. Sundays are unavailable.'}
      </p>
    </div>
  );
}
