'use client';

import { useState } from 'react';
import { Button } from '../../material/button';
import { Input } from '../../material/input';
import { TableRoot, TableHeader, TableBody, TableCaption, TableRow, TableCell, TableHead } from '../../material/table';

export interface ProjectRecord {
  id: string;
  name: string;
  owner: string;
  budget: number;
}

export interface DataTableRecipeProps {
  projects: readonly ProjectRecord[];
  pageSize?: number;
}

/** Sorting, filtering, and paging belong to application data; selection uses stable row IDs. */
export function DataTableRecipe({ projects, pageSize = 5 }: DataTableRecipeProps) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<{ column: 'name' | 'budget'; direction: 'asc' | 'desc' }>({
    column: 'name',
    direction: 'asc',
  });
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const size = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : 5;
  const search = query.trim().toLocaleLowerCase();
  const matching = projects.filter((project) =>
    `${project.name} ${project.owner}`.toLocaleLowerCase().includes(search),
  );
  const sorted = [...matching].sort((left, right) => {
    const order = sort.column === 'budget' ? left.budget - right.budget : left.name.localeCompare(right.name);
    return (sort.direction === 'asc' ? order : -order) || left.id.localeCompare(right.id);
  });
  const pages = Math.max(1, Math.ceil(sorted.length / size));
  const currentPage = Math.min(page, pages - 1);
  const visible = sorted.slice(currentPage * size, (currentPage + 1) * size);
  const changeSort = (column: 'name' | 'budget') => {
    setSort((current) => ({
      column,
      direction: current.column === column && current.direction === 'asc' ? 'desc' : 'asc',
    }));
    setPage(0);
  };
  return (
    <section aria-label="Project budgets">
      <Input
        type="search"
        label="Filter projects"
        value={query}
        onChange={(value) => {
          setQuery(value);
          setPage(0);
        }}
      />
      <div
        role="region"
        aria-label="Project budget table"
        tabIndex={0}
        className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-(--rt-color-primary)"
      >
        <TableRoot selectionMode="multiple" selected={selected} onSelectionChange={setSelected}>
          <TableCaption>Project budgets</TableCaption>
          <TableHeader>
            <TableHead selectLabel="Select all projects on this page">
              <TableCell
                sorted={sort.column === 'name' ? sort.direction : undefined}
                onClick={() => changeSort('name')}
              >
                Project
              </TableCell>
              <TableCell>Owner</TableCell>
              <TableCell
                numeric
                sorted={sort.column === 'budget' ? sort.direction : undefined}
                onClick={() => changeSort('budget')}
              >
                Budget (EUR)
              </TableCell>
            </TableHead>
          </TableHeader>
          <TableBody>
            {visible.map((project) => (
              <TableRow key={project.id} value={project.id} selectLabel={`Select ${project.name}`}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.owner}</TableCell>
                <TableCell numeric>
                  {new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
                    project.budget,
                  )}
                </TableCell>
              </TableRow>
            ))}
            {visible.length === 0 && (
              <tr>
                <TableCell colSpan={4}>No projects match your search.</TableCell>
              </tr>
            )}
          </TableBody>
        </TableRoot>
      </div>
      <div className="mt-[16px] flex flex-wrap items-center gap-[8px]">
        <span role="status" className="me-auto text-[14px]">
          {selected.length} selected · {matching.length} projects · Page {currentPage + 1} of {pages}
        </span>
        <Button disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>
          Previous
        </Button>
        <Button disabled={currentPage >= pages - 1} onClick={() => setPage(currentPage + 1)}>
          Next
        </Button>
      </div>
    </section>
  );
}
