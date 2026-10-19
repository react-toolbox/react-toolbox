'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
import TableHead, { type TableHeadProps } from './TableHead';
import TableRow, { type TableRowProps } from './TableRow';
import { TableRoot, type TableRootProps } from './parts';
export type TableProps = TableRootProps;
export function Table({ children, className, ...props }: TableProps) {
  const flatten = (children: ReactNode): ReactNode[] =>
    Children.toArray(children).flatMap((child) =>
      isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
        ? flatten(child.props.children)
        : [child],
    );
  const elements = flatten(children);
  const rows = elements.filter(
    (child): child is ReactElement<TableRowProps> => isValidElement<TableRowProps>(child) && child.type === TableRow,
  );
  const heads = elements.filter(
    (child): child is ReactElement<TableHeadProps> => isValidElement<TableHeadProps>(child) && child.type === TableHead,
  );
  const structure = elements.filter(
    (child) => isValidElement(child) && (child.type === 'caption' || child.type === 'colgroup'),
  );
  const footer = elements.filter((child) => isValidElement(child) && child.type === 'tfoot');
  const explicitHeads = elements.filter((child) => isValidElement(child) && child.type === 'thead');
  const explicitBodies = elements.filter((child) => isValidElement(child) && child.type === 'tbody');
  const customSections = elements.filter(
    (child) =>
      isValidElement(child) &&
      ![TableHead, TableRow, 'caption', 'colgroup', 'tfoot', 'thead', 'tbody'].includes(child.type as typeof TableHead),
  );
  return (
    <TableRoot
      {...props}
      className={cn(
        'rt-table-table',
        'bg-(--rt-color-white) border-collapse text-(length:--table-font-size) w-full',
        materialRoot,
        materialDescendants,
        className,
      )}
    >
      {structure}
      {explicitHeads.length ? (
        explicitHeads
      ) : (
        <thead className={cn('rt-table-head', 'pb-[calc(0.3*var(--unit))] whitespace-nowrap')}>{heads}</thead>
      )}
      {explicitBodies.length ? explicitBodies : <tbody>{rows}</tbody>}
      {customSections}
      {footer}
    </TableRoot>
  );
}
export default Table;
