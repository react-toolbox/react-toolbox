'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from 'react-toolbox';

export default function CopyCodeButton({ code, label }: { code: string; label: string }) {
  const [status, setStatus] = useState('Copy');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Copied');
    } catch {
      setStatus('Select to copy');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('Copy'), 2500);
  }
  return (
    <Button primary onClick={copy} aria-label={`Copy ${label.toLowerCase()}`}>
      <span aria-live="polite">{status}</span>
    </Button>
  );
}
