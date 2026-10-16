'use client';

import { useId, useRef, useState } from 'react';
import { Button } from '../../material/button';
import { Dialog } from '../../material/dialog';

export interface LoadingButtonRecipeProps {
  onSave: () => Promise<void>;
}

/** Keep application work and its error message outside the core button contract. */
export function LoadingButtonRecipe({ onSave }: LoadingButtonRecipeProps) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const save = async () => {
    setPending(true);
    setMessage('');
    try {
      await onSave();
      setMessage('Changes saved.');
    } catch {
      setMessage('Changes could not be saved. Try again.');
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="flex flex-wrap items-center gap-[16px]">
      <Button primary raised disabled={pending} aria-busy={pending} onClick={save}>
        {pending ? 'Saving…' : 'Save changes'}
      </Button>
      <span role="status" className="text-[14px]">
        {message}
      </span>
    </div>
  );
}

export interface DestructiveActionRecipeProps {
  itemName: string;
  onDelete: () => Promise<void> | void;
}

/** Focus the safe action first and keep a failed deletion open for retry. */
export function DestructiveActionRecipe({ itemName, onDelete }: DestructiveActionRecipeProps) {
  const descriptionId = useId();
  const cancel = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const close = () => {
    if (!pending) setOpen(false);
  };
  const remove = async () => {
    setPending(true);
    setError('');
    try {
      await onDelete();
      setOpen(false);
    } catch {
      setError('The item could not be deleted. Try again.');
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <Button
        className="text-[color:var(--recipe-destructive,rgb(222,50,38))]!"
        onClick={() => {
          setError('');
          setOpen(true);
        }}
      >
        Delete {itemName}
      </Button>
      <Dialog
        active={open}
        role="alertdialog"
        title={`Delete ${itemName}?`}
        aria-describedby={descriptionId}
        aria-busy={pending}
        onEscKeyDown={close}
        onOverlayClick={close}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          cancel.current?.focus();
        }}
      >
        <p id={descriptionId}>This action permanently deletes this item and cannot be undone.</p>
        {error && <p role="alert">{error}</p>}
        <div className="mt-[24px] flex justify-end gap-[8px]">
          <Button ref={cancel} disabled={pending} onClick={close}>
            Cancel
          </Button>
          <Button
            disabled={pending}
            className="text-[color:var(--recipe-destructive,rgb(222,50,38))]!"
            onClick={remove}
          >
            {pending ? 'Deleting…' : 'Delete'}
          </Button>
        </div>
      </Dialog>
    </>
  );
}
