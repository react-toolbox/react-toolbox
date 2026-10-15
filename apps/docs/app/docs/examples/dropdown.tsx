'use client';
import { useId, useState } from 'react';
import { Button } from 'react-toolbox/button';
import { FontIcon } from 'react-toolbox/font-icon';
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownSelection,
  DropdownIcon,
  DropdownPortal,
  DropdownContent,
  DropdownViewport,
  DropdownGroup,
  DropdownLabel,
  DropdownOption,
  DropdownOptionText,
  DropdownOptionIndicator,
} from 'react-toolbox/dropdown';

export default function DropdownComposition() {
  const labelId = useId();
  const [saved, setSaved] = useState('');
  return (
    <form
      className="max-w-sm space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(String(new FormData(event.currentTarget).get('destination')));
      }}
    >
      <span id={labelId} className="text-toolbox-caption text-toolbox-text-secondary">
        Destination
      </span>
      <DropdownRoot name="destination" defaultValue="madrid" required>
        <DropdownTrigger aria-labelledby={labelId}>
          <DropdownSelection placeholder="Choose a city" />
          <DropdownIcon asChild>
            <FontIcon value="arrow_drop_down" aria-hidden />
          </DropdownIcon>
        </DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <DropdownViewport>
              <DropdownGroup>
                <DropdownLabel>Europe</DropdownLabel>
                <DropdownOption value="madrid">
                  <DropdownOptionText>Madrid</DropdownOptionText>
                  <DropdownOptionIndicator className="ml-auto">
                    <FontIcon value="check" aria-hidden />
                  </DropdownOptionIndicator>
                </DropdownOption>
                <DropdownOption value="lisbon">
                  <DropdownOptionText>Lisbon</DropdownOptionText>
                  <DropdownOptionIndicator className="ml-auto">
                    <FontIcon value="check" aria-hidden />
                  </DropdownOptionIndicator>
                </DropdownOption>
              </DropdownGroup>
              <DropdownGroup>
                <DropdownLabel>Asia</DropdownLabel>
                <DropdownOption value="tokyo" disabled>
                  <DropdownOptionText>Tokyo — unavailable</DropdownOptionText>
                </DropdownOption>
              </DropdownGroup>
            </DropdownViewport>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <Button primary type="submit">
        Save destination
      </Button>
      <output className="block text-toolbox-body">{saved && `Destination: ${saved}`}</output>
    </form>
  );
}
