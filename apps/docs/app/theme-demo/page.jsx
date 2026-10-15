'use client';

import { useState } from 'react';
import { Button, DatePicker, Input, ThemeProvider } from 'react-toolbox';

const customVariables = {
  '--color-primary': '#00695c',
  '--color-primary-dark': '#004d40',
  '--color-accent': '#ff6d00',
};

export default function ThemeExample() {
  const [name, setName] = useState('Your project');
  const [date, setDate] = useState(() => new Date(2026, 9, 13));
  const [custom, setCustom] = useState(true);

  return (
    <main className="mx-auto max-w-[860px] px-6 py-12">
      <p className="gallery-eyebrow">Make it yours</p>
      <h1 className="gallery-title">A theme that travels with you.</h1>
      <p className="gallery-introduction mb-8">The gallery uses the original palette. This separate example changes only its named color variables, within a local theme provider.</p>
      <section className="gallery-section" aria-label="Default theme">
        <div className="gallery-section-heading"><h2 className="gallery-section-title">Original palette</h2></div>
        <div className="gallery-section-body flex flex-wrap gap-4">
          <Button label="Default primary" raised primary />
          <Button label="Default accent" raised accent />
        </div>
      </section>
      <ThemeProvider variables={custom ? customVariables : {}}>
        <section className="gallery-section" aria-label="Scoped theme">
          <div className="gallery-section-heading">
            <h2 className="gallery-section-title">{custom ? 'A custom teal & orange palette' : 'The original palette, restored'}</h2>
            <p className="gallery-section-description">Open the date picker: the dialog keeps this theme, even when rendered in a portal.</p>
          </div>
          <div className="gallery-section-body">
            <div className="mb-6 flex flex-wrap gap-4">
              <Button label="Scoped primary" raised primary />
              <Button label="Scoped accent" raised accent />
              <Button label={custom ? 'Restore original colors' : 'Apply custom colors'} onClick={() => setCustom(value => !value)} />
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <Input label="Project name" aria-label="Project name" value={name} onChange={setName} />
              <DatePicker label="Themed date" aria-label="Themed date" value={date} onChange={setDate} />
            </div>
          </div>
        </section>
      </ThemeProvider>
      <p className="gallery-note">Color customization uses CSS variables. Existing theme slot class names remain available for more specific changes. Tailwind utilities can customize individual components.</p>
      <div className="mt-8"><Button label="Back to component gallery" icon="arrow_back" href="/components" /></div>
    </main>
  );
}
