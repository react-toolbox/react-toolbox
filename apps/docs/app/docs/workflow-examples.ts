import type { ComponentSlug } from './catalog';

/** Complete, copyable recipes for capabilities beyond the introductory preview. */
export const workflowExamples: Partial<Record<ComponentSlug, { title: string; code: string }>> = {
  button: {
    title: 'Use a router link',
    code: `'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/material/button';

export default function Example() {
  return <Button asChild primary raised><Link href="/projects">Projects</Link></Button>;
}`,
  },
  autocomplete: {
    title: 'Grouped choices in a native form',
    code: `'use client';
import { useState } from 'react';
import { Autocomplete } from '@/components/ui/material/autocomplete';

export default function Example() {
  const [saved, setSaved] = useState<string[]>([]);
  return <form onSubmit={event => {
    event.preventDefault();
    setSaved(new FormData(event.currentTarget).getAll('people').map(String));
  }}>
    <Autocomplete label="People" name="people" required clearable
      defaultValue={['ada']} emptyMessage="No people found"
      source={[
        { value: 'ada', label: <strong>Ada Lovelace</strong>, textValue: 'Ada Lovelace', group: 'Engineering' },
        { value: 'grace', label: 'Grace Hopper', group: 'Engineering' },
        { value: 'alan', label: 'Alan Turing (unavailable)', disabled: true, group: 'Research' },
      ]} />
    <button type="submit">Save</button>
    <button type="reset">Reset</button>
    <output>{saved.join(', ')}</output>
  </form>;
}`,
  },
  dropdown: {
    title: 'Grouped options without application state',
    code: `'use client';
import { Dropdown } from '@/components/ui/material/dropdown';

export default function Example() {
  return <Dropdown label="Destination" name="destination" defaultValue="madrid"
    source={[
      { value: 'madrid', label: 'Madrid', group: 'Europe' },
      { value: 'lisbon', label: 'Lisbon', group: 'Europe' },
      { value: 'tokyo', label: 'Tokyo', group: 'Asia', disabled: true },
    ]} />;
}`,
  },
  menu: {
    title: 'A menu for display preferences',
    code: `'use client';
import { Button } from '@/components/ui/material/button';
import { IconMenu, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuDivider } from '@/components/ui/material/menu';

export default function Example() {
  return <IconMenu trigger={<Button label="Display options" />}>
    <MenuCheckboxItem caption="Show toolbar" defaultChecked />
    <MenuDivider />
    <MenuRadioGroup aria-label="Density" defaultValue="comfortable">
      <MenuRadioItem value="comfortable" caption="Comfortable" />
      <MenuRadioItem value="compact" caption="Compact" />
    </MenuRadioGroup>
  </IconMenu>;
}`,
  },
  tabs: {
    title: 'Manual activation with persistent panels',
    code: `'use client';
import { Tabs, Tab } from '@/components/ui/material/tabs';

export default function Example() {
  return <Tabs defaultIndex={0} activationMode="manual" hideMode="display" aria-label="Settings">
    <Tab label="Profile"><input aria-label="Display name" defaultValue="Ada" /></Tab>
    <Tab label="Notifications"><p>Use Enter or Space to switch panels.</p></Tab>
  </Tabs>;
}`,
  },
  slider: {
    title: 'Commit expensive updates after interaction',
    code: `'use client';
import { useState } from 'react';
import { Slider } from '@/components/ui/material/slider';

export default function Example() {
  const [committed, setCommitted] = useState(40);
  return <form>
    <Slider aria-label="Volume" name="volume" defaultValue={40} step={1}
      onValueCommit={setCommitted} editable />
    <output>Last committed: {committed}</output>
    <button type="reset">Reset</button>
  </form>;
}`,
  },
  dialog: {
    title: 'Focus a field on opening',
    code: `'use client';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/material/button';
import { Dialog } from '@/components/ui/material/dialog';

export default function Example() {
  const [active, setActive] = useState(false);
  const field = useRef<HTMLInputElement>(null);
  return <>
    <Button label="Edit profile" onClick={() => setActive(true)} />
    <Dialog active={active} title="Edit profile"
      onOpenAutoFocus={event => { event.preventDefault(); field.current?.focus(); }}
      onEscKeyDown={() => setActive(false)} onOverlayClick={() => setActive(false)}
      actions={[{ label: 'Done', onClick: () => setActive(false) }]}>
      <label>Display name <input ref={field} defaultValue="Ada" /></label>
    </Dialog>
  </>;
}`,
  },
  'date-picker': {
    title: 'Uncontrolled selection and reset',
    code: `'use client';
import { DatePicker } from '@/components/ui/material/date-picker';

export default function Example() {
  return <form>
    <DatePicker label="Start date" name="start" defaultValue={new Date(2026, 9, 15)} />
    <button type="reset">Reset date</button>
  </form>;
}`,
  },
  'time-picker': {
    title: 'Uncontrolled selection and reset',
    code: `'use client';
import { TimePicker } from '@/components/ui/material/time-picker';

export default function Example() {
  return <form>
    <TimePicker label="Reminder" name="reminder" defaultValue={new Date(2026, 9, 15, 9, 30)} />
    <button type="reset">Reset time</button>
  </form>;
}`,
  },
  table: {
    title: 'Compose with native table sections',
    code: `'use client';
import { Table, TableHead, TableRow, TableCell } from '@/components/ui/material/table';

export default function Example() {
  return <Table selectable={false}>
    <caption>Project totals</caption>
    <thead><TableHead><TableCell>Project</TableCell><TableCell numeric>Total</TableCell></TableHead></thead>
    <tbody><TableRow><TableCell tagName="th" scope="row">Library</TableCell><TableCell numeric>42</TableCell></TableRow></tbody>
    <tfoot><tr><td colSpan={2}>One project</td></tr></tfoot>
  </Table>;
}`,
  },
};
