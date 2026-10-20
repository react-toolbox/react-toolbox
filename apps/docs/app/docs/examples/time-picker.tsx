'use client';
import { useState } from 'react';
import { TimePicker } from 'react-toolbox/time-picker';
import { Dropdown } from 'react-toolbox/dropdown';
import { Button } from 'react-toolbox/button';

export default function SchedulingComposition() {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [zone, setZone] = useState('Europe/Madrid');
  const [saved, setSaved] = useState('');
  return (
    <form
      className="max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        if (start && end)
          setSaved(
            `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}–${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} in ${zone}`,
          );
      }}
    >
      <TimePicker
        label="Starts at"
        value={start}
        onChange={setStart}
        minuteStep={15}
        clearable
        onClear={() => setStart(null)}
        required
      />
      <TimePicker
        label="Ends at"
        value={end}
        onChange={setEnd}
        minTime={start ?? undefined}
        minuteStep={15}
        clearable
        onClear={() => setEnd(null)}
        required
      />
      <Dropdown
        label="Time zone"
        source={['Europe/Madrid', 'Europe/London', 'America/New_York']}
        value={zone}
        onChange={(value) => setZone(String(value))}
      />
      <p className="mb-4 text-toolbox-caption text-toolbox-text-secondary">
        Times are wall-clock values in the selected zone. Resolve them to instants with the booking date when saving.
      </p>
      <Button type="submit" primary raised>
        Save time window
      </Button>
      <p role="status" className="mt-4 text-toolbox-body">
        {saved}
      </p>
    </form>
  );
}
