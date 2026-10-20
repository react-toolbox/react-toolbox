'use client';

import { useId, useState } from 'react';
import { Button, IconButton } from '../../material/button';
import { Input } from '../../material/input';

export interface InputFormRecipeProps {
  onSubmitData?: (data: FormData) => void;
}

/** Native names, constraints, submission, and reset remain the form's source of truth. */
export function InputFormRecipe({ onSubmitData }: InputFormRecipeProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  return (
    <form
      className="max-w-[480px]"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitData?.(new FormData(event.currentTarget));
        setMessage('Preferences saved.');
      }}
      onReset={() => {
        setVisible(false);
        setMessage('');
      }}
    >
      <Input
        id={`${id}-budget`}
        name="budget"
        label="Monthly budget"
        type="number"
        defaultValue="250"
        min="0"
        step="0.01"
        required
        floating={false}
        aria-describedby={`${id}-budget-help`}
        className="[&>input]:ps-[24px] [&>input]:pe-[40px]"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-s-0 top-[calc(var(--input-padding)+var(--input-field-padding))]"
        >
          €
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-e-0 top-[calc(var(--input-padding)+var(--input-field-padding))]"
        >
          EUR
        </span>
      </Input>
      <p id={`${id}-budget-help`} className="m-0 text-[12px] text-(--rt-color-text-secondary)">
        Amount in euros. You can change it at any time.
      </p>
      <Input
        id={`${id}-password`}
        name="password"
        label="Password"
        type={visible ? 'text' : 'password'}
        autoComplete="new-password"
        minLength={8}
        required
        aria-describedby={`${id}-password-help`}
        className="[&>input]:pe-[48px]"
      >
        <IconButton
          icon={visible ? 'visibility_off' : 'visibility'}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-controls={`${id}-password`}
          aria-pressed={visible}
          className="absolute inset-e-0 top-1/2 -translate-y-1/2"
          onClick={() => setVisible((current) => !current)}
        />
      </Input>
      <p id={`${id}-password-help`} className="m-0 text-[12px] text-(--rt-color-text-secondary)">
        Use at least eight characters.
      </p>
      <div className="mt-[24px] flex gap-[8px]">
        <Button type="submit" primary raised>
          Save preferences
        </Button>
        <Button type="reset">Reset</Button>
      </div>
      <p role="status" className="text-[14px]">
        {message}
      </p>
    </form>
  );
}
