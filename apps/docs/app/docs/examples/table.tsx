'use client';
import { useState } from 'react';
import { Button } from 'react-toolbox/button';
import {
  TableRoot,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from 'react-toolbox/table';

function PersonRow({ person }: { person: { id: string; name: string } }) {
  return (
    <TableRow value={person.id} selectLabel={`Select ${person.name}`}>
      <TableCell>{person.name}</TableCell>
      <TableCell>Member</TableCell>
    </TableRow>
  );
}
function NameHeading() {
  return <TableCell>Name</TableCell>;
}
export default function TableComposition() {
  const [people, setPeople] = useState([
    { id: 'ada', name: 'Ada Lovelace' },
    { id: 'grace', name: 'Grace Hopper' },
  ]);
  const [selected, setSelected] = useState<string[]>(['ada']);
  return (
    <div className="space-y-4">
      <Button onClick={() => setPeople([...people].reverse())}>Reverse row order</Button>
      <div className="overflow-x-auto">
        <TableRoot selectionMode="multiple" selected={selected} onSelectionChange={setSelected}>
          <TableCaption>Team members</TableCaption>
          <TableHeader>
            <TableHead>
              <NameHeading />
              <TableCell>Role</TableCell>
            </TableHead>
          </TableHeader>
          <TableBody>
            {people.map((person) => (
              <PersonRow key={person.id} person={person} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>{people.length} members</TableCell>
            </TableRow>
          </TableFooter>
        </TableRoot>
      </div>
      <output className="block text-toolbox-body">Selected: {selected.join(', ') || 'none'}</output>
    </div>
  );
}
