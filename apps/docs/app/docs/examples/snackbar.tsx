'use client';

import { Button } from 'react-toolbox/button';
import { useSnackbarQueue } from 'react-toolbox/examples/snackbar-queue';

export default function SnackbarComposition() {
  const queue = useSnackbarQueue();
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        onClick={() => {
          queue.enqueue({ label: 'First observation saved' });
          queue.enqueue({ label: 'Second observation saved' });
        }}
      >
        Queue messages
      </Button>
      <Button
        primary
        onClick={() => {
          const save = new Promise<void>((resolve) => setTimeout(resolve, 700));
          void queue
            .track(save, {
              pending: 'Saving observations…',
              success: () => 'Observations saved',
              error: () => 'Observations could not be saved',
            })
            .catch(() => undefined);
        }}
      >
        Track a save
      </Button>
      {queue.snackbar}
    </div>
  );
}
