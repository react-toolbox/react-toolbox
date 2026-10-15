'use client';
import { useState } from 'react';
import { Button } from 'react-toolbox/button';
import { FontIcon } from 'react-toolbox/font-icon';
import {
  AutocompleteRoot,
  AutocompleteLabel,
  AutocompleteInputGroup,
  AutocompleteChips,
  AutocompleteChip,
  AutocompleteChipRemove,
  AutocompleteSelection,
  AutocompleteInput,
  AutocompleteTrigger,
  AutocompleteClear,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteItemIndicator,
  AutocompleteEmpty,
} from 'react-toolbox/autocomplete';

const people = [
  { value: 'ada', label: 'Ada Lovelace', team: 'Engineering' },
  { value: 'grace', label: 'Grace Hopper', team: 'Engineering' },
  { value: 'alan', label: 'Alan Turing', team: 'Research' },
];
type Person = (typeof people)[number];
export default function AutocompleteComposition() {
  const [saved, setSaved] = useState<string[]>([]);
  return (
    <form
      className="max-w-lg space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(new FormData(event.currentTarget).getAll('people').map(String));
      }}
    >
      <AutocompleteRoot items={people} multiple name="people" defaultValue={[people[0]]}>
        <AutocompleteLabel>Invite teammates</AutocompleteLabel>
        <AutocompleteInputGroup className="flex-wrap">
          <AutocompleteChips className="flex-1">
            <AutocompleteSelection>
              {(selected: Person[]) =>
                selected.map((person) => (
                  <AutocompleteChip key={person.value} aria-label={person.label}>
                    {person.label}
                    <AutocompleteChipRemove aria-label={`Remove ${person.label}`}>
                      <FontIcon value="cancel" aria-hidden className="text-[18px]" />
                    </AutocompleteChipRemove>
                  </AutocompleteChip>
                ))
              }
            </AutocompleteSelection>
            <AutocompleteInput placeholder="Find a teammate" className="min-w-40" />
          </AutocompleteChips>
          <AutocompleteClear aria-label="Clear teammates">
            <FontIcon value="close" aria-hidden />
          </AutocompleteClear>
          <AutocompleteTrigger aria-label="Show teammates">
            <FontIcon value="arrow_drop_down" aria-hidden />
          </AutocompleteTrigger>
        </AutocompleteInputGroup>
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup>
              <AutocompleteEmpty>No teammates found.</AutocompleteEmpty>
              <AutocompleteList>
                {(person: Person) => (
                  <AutocompleteItem key={person.value} value={person} disabled={person.value === 'alan'}>
                    <span>
                      <span className="block">{person.label}</span>
                      <span className="text-toolbox-caption text-toolbox-text-secondary">{person.team}</span>
                    </span>
                    <AutocompleteItemIndicator className="ml-auto">
                      <FontIcon value="check" aria-hidden />
                    </AutocompleteItemIndicator>
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
      </AutocompleteRoot>
      <Button type="submit" primary>
        Save teammates
      </Button>
      <output className="block text-toolbox-body">{saved.join(', ')}</output>
    </form>
  );
}
