'use client';

import { Avatar } from '../../material/avatar';

export interface AvatarPerson {
  id: string;
  name: string;
  image?: string;
}

export interface AvatarGroupRecipeProps {
  people: readonly AvatarPerson[];
  maxVisible?: number;
  label?: string;
}

/** Each person remains named for assistive technology, including the overflow group. */
export function AvatarGroupRecipe({ people, maxVisible = 3, label = 'Project members' }: AvatarGroupRecipeProps) {
  const limit = Number.isFinite(maxVisible) ? Math.max(0, Math.floor(maxVisible)) : 3;
  const visible = people.slice(0, limit);
  const overflow = people.slice(limit);
  return (
    <ul aria-label={label} className="m-0 flex list-none p-0">
      {visible.map((person) => (
        <li key={person.id} className="-ms-[8px] first:ms-0" title={person.name}>
          <Avatar
            title={person.name}
            image={person.image}
            aria-hidden
            className="ring-[2px] ring-(--rt-color-background)"
          />
          <span className="sr-only">{person.name}</span>
        </li>
      ))}
      {overflow.length > 0 && (
        <li className="-ms-[8px] first:ms-0" title={overflow.map((person) => person.name).join(', ')}>
          <Avatar aria-hidden className="ring-[2px] ring-(--rt-color-background)">
            +{overflow.length}
          </Avatar>
          <span className="sr-only">Also {overflow.map((person) => person.name).join(', ')}</span>
        </li>
      )}
    </ul>
  );
}

export interface AvatarStatusRecipeProps {
  person: AvatarPerson;
  status: 'online' | 'away' | 'offline';
}

export function AvatarStatusRecipe({ person, status }: AvatarStatusRecipeProps) {
  return (
    <span role="img" aria-label={`${person.name}: ${status}`} className="relative inline-flex">
      <Avatar title={person.name} image={person.image} aria-hidden />
      <span
        aria-hidden
        className="absolute bottom-0 inset-e-0 size-[12px] rounded-full ring-[2px] ring-(--rt-color-background)"
        style={{
          backgroundColor:
            status === 'online'
              ? 'var(--rt-color-primary)'
              : status === 'away'
                ? 'var(--rt-color-accent)'
                : 'var(--rt-color-text-secondary)',
        }}
      />
    </span>
  );
}
