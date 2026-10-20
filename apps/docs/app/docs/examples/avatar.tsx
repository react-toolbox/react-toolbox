'use client';

import { AvatarGroupRecipe, AvatarStatusRecipe } from 'react-toolbox/examples/recipes';

const people = [
  { id: 'ada', name: 'Ada Lovelace' },
  { id: 'grace', name: 'Grace Hopper' },
  { id: 'margaret', name: 'Margaret Hamilton' },
  { id: 'katherine', name: 'Katherine Johnson' },
];

export default function AvatarComposition() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <AvatarGroupRecipe people={people} />
      <AvatarStatusRecipe person={people[0]} status="online" />
    </div>
  );
}
