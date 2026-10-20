'use client';

import { LoadingButtonRecipe } from 'react-toolbox/examples/recipes';

/** Simulate application work without sending example data. */
function saveChanges() {
  return new Promise<void>((resolve) => setTimeout(resolve, 700));
}

export default function ButtonComposition() {
  return <LoadingButtonRecipe onSave={saveChanges} />;
}
