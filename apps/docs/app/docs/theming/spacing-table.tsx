'use client';

import { Table, TableCell, TableHead, TableRow } from 'react-toolbox';

export default function SpacingTable() {
  return (
    <div className="overflow-x-auto rounded-toolbox border border-toolbox-divider">
      <Table selectable={false} aria-label="Material spacing utilities">
        <TableHead>
          <TableCell scope="col">Utility</TableCell>
          <TableCell scope="col" numeric>
            Spacing
          </TableCell>
        </TableHead>
        {[
          ['gap-2', '8px'],
          ['p-4', '16px'],
          ['p-6', '24px'],
          ['gap-8', '32px'],
        ].map(([utility, spacing]) => (
          <TableRow key={utility}>
            <TableCell>
              <code>{utility}</code>
            </TableCell>
            <TableCell numeric>{spacing}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
