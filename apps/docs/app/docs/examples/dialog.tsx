'use client';

import { useState } from 'react';
import { DestructiveActionRecipe } from 'react-toolbox/examples/recipes';
import ProfileDialog from './profile-dialog';

export default function DialogComposition() {
  const [deleted, setDeleted] = useState(false);
  return (
    <div className="space-y-8">
      <section aria-label="Profile form" className="space-y-4">
        <h3 className="text-toolbox-subheading">A form with an independent footer</h3>
        <ProfileDialog />
      </section>
      <section aria-label="Destructive confirmation" className="space-y-4">
        <h3 className="text-toolbox-subheading">Confirm a destructive action</h3>
        <p className="text-toolbox-body/6">
          Focus Cancel first, prevent repeated submission while pending, and keep failures open for retry. Pass your
          application’s delete callback to the editable example; this demo only changes local state.
        </p>
        {deleted ? (
          <p role="status">Example draft deleted.</p>
        ) : (
          <DestructiveActionRecipe
            itemName="example draft"
            onDelete={async () => {
              await new Promise<void>((resolve) => setTimeout(resolve, 700));
              setDeleted(true);
            }}
          />
        )}
      </section>
    </div>
  );
}
