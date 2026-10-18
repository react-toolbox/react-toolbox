'use client';
import { useState } from 'react';
import { Button } from 'react-toolbox/button';
import { DataTableRecipe } from 'react-toolbox/examples/recipes';
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

const projects = [
  { id: 'coast', name: 'Coastal survey', owner: 'Ada', budget: 2500 },
  { id: 'river', name: 'River habitats', owner: 'Grace', budget: 1800 },
  { id: 'forest', name: 'Forest canopy', owner: 'Margaret', budget: 4200 },
  { id: 'wetland', name: 'Wetland census', owner: 'Katherine', budget: 3200 },
];

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
    <div className="space-y-8">
      <section aria-label="Custom table rows" className="space-y-4">
        <h3 className="text-toolbox-subheading">Custom rows and sections</h3>
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
      </section>
      <section aria-label="Data table workflow" className="space-y-4">
        <h3 className="text-toolbox-subheading">Filter, sort, select and paginate</h3>
        <p className="text-toolbox-body/6">
          Selection uses stable record IDs across filtering, sorting, and pages. The header selects the current page.
          Keep remote fetching and larger data engines in your application.
        </p>
        <DataTableRecipe projects={projects} pageSize={3} />
      </section>
    </div>
  );
}
