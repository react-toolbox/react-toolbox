'use client';

import { useState } from 'react';
import {
  LoadingButtonRecipe,
  DestructiveActionRecipe,
  AvatarGroupRecipe,
  AvatarStatusRecipe,
  InputFormRecipe,
  DataTableRecipe,
} from 'react-toolbox/examples/recipes';
import { useSnackbarQueue } from 'react-toolbox/examples/snackbar-queue';
import { Button } from 'react-toolbox/button';

const people = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'grace', name: 'Grace Hopper' },
  { id: 'margaret', name: 'Margaret Hamilton' },
  { id: 'katherine', name: 'Katherine Johnson' },
];
const projects = [
  { id: 'coast', name: 'Coastal survey', owner: 'Ada', budget: 2500 },
  { id: 'river', name: 'River habitats', owner: 'Grace', budget: 1800 },
  { id: 'forest', name: 'Forest canopy', owner: 'Margaret', budget: 4200 },
  { id: 'wetland', name: 'Wetland census', owner: 'Katherine', budget: 3200 },
];

/** A simulated save makes the pending state visible without sending example data. */
function saveExample() {
  return new Promise<void>((resolve) => setTimeout(resolve, 700));
}

export function ActionRecipes() {
  const [deleted, setDeleted] = useState(false);
  return (
    <div className="space-y-6">
      <LoadingButtonRecipe onSave={saveExample} />
      {deleted ? (
        <p role="status">Example draft deleted.</p>
      ) : (
        <DestructiveActionRecipe itemName="example draft" onDelete={() => setDeleted(true)} />
      )}
    </div>
  );
}

export function AvatarRecipes() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <AvatarGroupRecipe people={people} />
      <AvatarStatusRecipe person={people[0]} status="online" />
    </div>
  );
}

export function FormRecipe() {
  return <InputFormRecipe />;
}

export function TableRecipe() {
  return <DataTableRecipe projects={projects} pageSize={3} />;
}

export function SnackbarRecipe() {
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
          void queue.track(saveExample(), {
            pending: 'Saving observations…',
            success: () => 'Observations saved',
            error: () => 'Observations could not be saved',
          });
        }}
      >
        Track a save
      </Button>
      {queue.snackbar}
    </div>
  );
}
