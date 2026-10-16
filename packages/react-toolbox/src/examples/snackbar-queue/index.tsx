'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Snackbar, type SnackbarProps } from '../../material/snackbar';

interface Message {
  label: ReactNode;
  action?: string;
  onAction?: () => void;
  timeout?: number;
  type?: SnackbarProps['type'];
}
interface QueuedMessage extends Message {
  id: number;
}
interface PromiseMessages<Value> {
  pending: ReactNode;
  success: (value: Value) => ReactNode;
  error: (reason: unknown) => ReactNode;
}
const exitDelay = 500;

/** An opt-in application recipe: one visible snackbar, in arrival order, including async results. */
export function useSnackbarQueue() {
  const [messages, setMessages] = useState<QueuedMessage[]>([]);
  const [closing, setClosing] = useState(false);
  const nextId = useRef(0);
  const enqueue = useCallback((message: Message) => {
    const id = ++nextId.current;
    setMessages((current) => [...current, { timeout: 4000, ...message, id }]);
    return id;
  }, []);
  const track = useCallback(
    async <Value,>(promise: Promise<Value>, labels: PromiseMessages<Value>): Promise<Value> => {
      const id = enqueue({ label: labels.pending, timeout: 0 });
      const update = (message: Message) =>
        setMessages((current) => current.map((item) => (item.id === id ? { ...item, ...message } : item)));
      try {
        const value = await promise;
        update({ label: labels.success(value), type: 'accept', timeout: 4000 });
        return value;
      } catch (reason) {
        update({ label: labels.error(reason), type: 'warning', timeout: 4000 });
        throw reason;
      }
    },
    [enqueue],
  );
  useEffect(() => {
    if (!closing) return;
    /** Keep the old message mounted until its exit completes, then show the next one. */
    const timer = setTimeout(() => {
      setMessages((current) => current.slice(1));
      setClosing(false);
    }, exitDelay);
    return () => clearTimeout(timer);
  }, [closing]);
  const current = messages[0];
  const snackbar = current ? (
    <Snackbar
      key={current.id}
      active={!closing}
      delay={exitDelay}
      label={current.label}
      action={current.action}
      type={current.type}
      timeout={current.timeout}
      onTimeout={() => setClosing(true)}
      onClick={() => {
        setClosing(true);
        current.onAction?.();
      }}
    />
  ) : null;
  return { enqueue, track, snackbar };
}

export default function SnackbarQueueExample() {
  const { enqueue, track, snackbar } = useSnackbarQueue();
  return (
    <>
      <button
        onClick={() => {
          enqueue({ label: 'First message', timeout: 2000 });
          enqueue({ label: 'Second message', timeout: 2000 });
        }}
      >
        Queue two messages
      </button>
      <button
        onClick={() => {
          const save = new Promise<void>((resolve) => setTimeout(resolve, 600));
          void track(save, {
            pending: 'Saving draft…',
            success: () => 'Draft saved',
            error: () => 'Could not save draft',
          }).catch(() => undefined);
        }}
      >
        Simulate save
      </button>
      {snackbar}
    </>
  );
}
