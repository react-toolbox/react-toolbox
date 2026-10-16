'use client';

import { useState } from 'react';
import { RadioButton, RadioGroup } from 'react-toolbox';
import { FieldNotes, type FieldNotesProps } from 'react-toolbox/examples/field-notes';

export default function ThemedDistribution() {
  const [appearance, setAppearance] = useState<NonNullable<FieldNotesProps['appearance']>>('field-notes');
  return (
    <div>
      <RadioGroup
        name="distribution-appearance"
        value={appearance}
        onChange={(value) => setAppearance(value as typeof appearance)}
        aria-label="Example appearance"
        className="mb-4 flex flex-wrap gap-x-6"
      >
        <RadioButton value="material" label="Original Material" />
        <RadioButton value="field-notes" label="Field Notes" />
        <RadioButton value="night" label="Night" />
      </RadioGroup>
      <FieldNotes appearance={appearance} />
    </div>
  );
}
