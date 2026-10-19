'use client';

import { Table, TableCell, TableHead, TableRow } from 'react-toolbox';
import type { ApiProperty } from './api-types';

export default function ApiTable({ name, properties }: { name: string; properties: ApiProperty[] }) {
  return (
    <div
      role="region"
      aria-label={`${name} props`}
      tabIndex={0}
      className="overflow-x-auto rounded-toolbox border border-toolbox-divider"
    >
      <Table aria-label={`${name} API`} className="min-w-[560px] table-auto">
        <TableHead>
          <TableCell scope="col" className="w-1/4">
            Property
          </TableCell>
          <TableCell scope="col" className="w-1/2">
            Type
          </TableCell>
          <TableCell scope="col" className="w-1/4">
            Default
          </TableCell>
        </TableHead>
        {properties.map((property) => (
          <TableRow key={property.name}>
            <TableCell className="align-top">
              <code className="whitespace-nowrap">{property.name}</code>
              {property.required && <span className="mt-1 block text-xs text-toolbox-text-secondary">Required</span>}
            </TableCell>
            <TableCell className="align-top">
              <code className="wrap-anywhere whitespace-pre-wrap leading-5">{property.type}</code>
              {property.description && (
                <p className="mt-2 text-xs leading-5 text-toolbox-text-secondary">
                  {property.description}
                </p>
              )}
            </TableCell>
            <TableCell className="align-top">
              <code className="wrap-anywhere whitespace-pre-wrap">{property.default ?? '—'}</code>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
