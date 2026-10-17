# Calendars and scheduling

`DatePicker` preserves the M1 single-date dialog and its `onChange(date, event)` contract. `CalendarSelection` is an additive inline calendar for single dates, multiple dates, and ranges. Both use the same calendar day styles and date constraints.

## Range and multiple-date calendars

```tsx
'use client';

import { useState } from 'react';
import { CalendarSelection, type DateRange } from '@/components/ui/material/date-picker';

function BookingCalendar() {
  const [stay, setStay] = useState<DateRange>({ from: undefined, to: undefined });
  return (
    <CalendarSelection
      mode="range"
      value={stay}
      onValueChange={setStay}
      numberOfMonths={2}
      showWeekNumbers
      minDate={new Date()}
      isDateUnavailable={(date) => date.getDay() === 0}
      excludeUnavailable
      clearable
    />
  );
}
```

A range starts with `{ from: Date, to: undefined }`, completes on the next available day click, and starts again after a completed range. Earlier second clicks produce an ordered range. `excludeUnavailable` restarts the range when an unavailable day lies between its endpoints; without it, constraints apply to endpoints and a range may span unavailable days. Clearing returns `{ from: undefined, to: undefined }`.

For separate dates, use `mode="multiple"` with `value: Date[]` and `onValueChange`; clicking a selected day removes it. Clearing returns `[]`. Single mode uses `Date | null`, with `null` representing an empty selection. `defaultValue` supports uncontrolled usage in each mode. Treat mode as fixed for the lifetime of a calendar.

`month`/`onMonthChange` control the first visible month; `defaultMonth` initializes it. `numberOfMonths` displays consecutive months, wrapping when necessary. When a single month cannot fit a narrow container, the calendar scrolls horizontally to preserve day targets. Week numbers follow ISO weeks. `sundayFirstDayOfWeek` changes the visible week layout. `locale` controls month, weekday, and full date names; `labels` supplies navigation, calendar, clear, and week-number labels. `classNames` accepts the existing calendar style slots, and `className` styles the outer calendar.

Arrow keys, Home/End, and PageUp/PageDown move focus independently of selection; Shift+PageUp/PageDown moves a year. Unavailable days remain discoverable by arrow keys but cannot be selected. Enter/Space selects the focused day. A calendar supplies values to its consumer; it does not serialize a range or multiple dates into a form automatically.

## Single pickers and forms

Both pickers validate `required`, including when associated with a separate form through `form`. Invalid submission focuses the visible input. Disabled and readonly pickers do not participate in validation. Submitted values retain the existing display-format strings. Use the selected `Date` values for application serialization.

`clearable` adds a clear action. An uncontrolled picker clears itself; a controlled picker should set `value={null}` in `onClear`. `onChange` continues to receive only `Date` values. Form reset restores an uncontrolled picker's `defaultValue`.

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  clearable
  onClear={() => setDate(null)}
  startYear={1900}
  endYear={2150}
  labels={{ dialog: 'Choose appointment date', clear: 'Remove date' }}
/>
```

`startYear` and `endYear` bound the year chooser, while `minDate`, `maxDate`, `enabledDates`, `disabledDates`, and `isDateUnavailable` determine selectable days. Without explicit year bounds, the chooser covers 1900–2099 and expands to include a selected year outside that range; min/max dates supply the default endpoints when present.

## Picker orientation

Both pickers accept `layout="portrait" | "landscape" | "responsive"`. Portrait is the default and preserves existing geometry. Landscape places the colored header beside the calendar or clock and aligns actions underneath the selection area. Responsive uses landscape when the viewport is at least 600px wide and wider than it is tall. `--picker-landscape-header-width` customizes the shared header width; its default is `17 * --unit`.

## Local time ranges

`minTime` and `maxTime` constrain local clock hours and minutes; their calendar dates are ignored. Bounds are inclusive. A minimum later than the maximum permits an overnight interval, for example 22:00–02:00. `minuteStep` describes allowed minute marks within each hour: 15 permits :00, :15, :30, and :45. Its integer range is 1–60, with a default of 1.

Opening the dialog adjusts an unavailable initial draft to the nearest permitted time. Pointer changes choose the nearest permitted time; arrow keys move through permitted values in their direction. Home/End select the allowed value nearest that field's beginning/end. Confirmation is disabled when the constraints permit no minute marks. Externally supplied unavailable values fail form validation; `labels.unavailable` customizes that message. Changes preserve the date and seconds carried by the original value.

Compose two time pickers for start/end scheduling. This example requires a same-day interval; an overnight booking should explicitly store its end day too.

```tsx
'use client';

import { useState } from 'react';
import { TimePicker } from '@/components/ui/material/time-picker';

function AppointmentTimes() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  return (
    <>
      <TimePicker label="Start" value={start} onChange={setStart} minuteStep={15}
        clearable onClear={() => setStart(null)} required />
      <TimePicker label="End" value={end} onChange={setEnd} minTime={start ?? undefined}
        minuteStep={15} clearable onClear={() => setEnd(null)} required />
    </>
  );
}
```

When start changes after end, the existing end value remains visible and invalid until corrected. If equality is disallowed, validate that business rule on the form as well; picker bounds are inclusive.

## Explicit timezone scheduling

The pickers use local `Date` fields and do not convert them into an instant in another timezone. Keep the IANA timezone as a separate explicit choice, alongside the intended calendar day and clock values. Send those wall-clock fields to the scheduling boundary for timezone resolution and validation.

```tsx
const pad = (value: number) => String(value).padStart(2, '0');
const localDay = (value: Date) =>
  `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
const localTime = (value: Date) => `${pad(value.getHours())}:${pad(value.getMinutes())}`;

const appointment = {
  date: localDay(selectedDay),
  start: localTime(startTime),
  end: localTime(endTime),
  timeZone: selectedTimeZone, // For example, 'Europe/Madrid'.
};
```

The scheduling boundary should resolve nonexistent or repeated local times under an explicit policy and return the confirmed instant(s). Once confirmed, render the instant in the selected zone with `Intl.DateTimeFormat`:

```tsx
new Intl.DateTimeFormat('en-GB', {
  timeZone: appointment.timeZone,
  dateStyle: 'medium',
  timeStyle: 'short',
}).format(new Date(confirmedStartInstant));
```

Do not call `toISOString()` on a picker value to represent a wall-clock choice in an unrelated timezone. The selected zone, range validation, recurring-event rules, and daylight-saving policy belong to the scheduling model.

## Autocomplete query behavior

For the convenience `Autocomplete` in single-value mode, an uncontrolled query restores the committed selection's label on blur. `onQueryChange` reports that restoration when the text changes. Typing remains intact while remote options refresh; an explicitly controlled `query` is never restored automatically. Multiple-value queries retain their existing independent search behavior.
