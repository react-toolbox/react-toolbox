'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { TableTheme } from './types';
import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ComponentPropsWithRef,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../foundations/styles/cn';
import TableHead, { type TableHeadProps } from './TableHead';
import TableRow, { type TableRowProps } from './TableRow';
export interface TableProps extends ComponentPropsWithRef<'table'> {
  multiSelectable?: boolean;
  onRowSelect?: (selectedIndices: number[]) => void;
  selectable?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TableTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TableTheme;
}
export function Table({
  children,
  className = '',
  multiSelectable = false,
  onRowSelect,
  selectable = true,
  theme: legacyTheme,
  classNames,
  ...other
}: TableProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const flatten = (children: ReactNode): ReactNode[] =>
    Children.toArray(children).flatMap((child) =>
      isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
        ? flatten(child.props.children)
        : [child],
    );
  const elements = flatten(children);
  const bodyElements = elements.flatMap((child) =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === 'tbody' ? flatten(child.props.children) : [child],
  );
  const rows = bodyElements.filter(
    (child): child is ReactElement<TableRowProps> => isValidElement<TableRowProps>(child) && child.type === TableRow,
  );
  const heads = elements.filter(
    (child): child is ReactElement<TableHeadProps> => isValidElement<TableHeadProps>(child) && child.type === TableHead,
  );
  const selectedIndices = rows.flatMap((row, index) => (row.props.selected ? [index] : []));
  const eligibleIndices = rows.flatMap((row, index) =>
    (row.props.selectable ?? selectable) && !row.props.selectionDisabled ? [index] : [],
  );
  const selectedEligible = eligibleIndices.filter((index) => selectedIndices.includes(index));
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
  function selectRow(index: number) {
    onRowSelect?.(
      multiSelectable
        ? selectedIndices.includes(index)
          ? selectedIndices.filter((selected) => selected !== index)
          : [...selectedIndices, index]
        : selectedIndices.includes(index)
          ? []
          : [index],
    );
  }
  const decorateHead = (head: ReactElement<TableHeadProps>) =>
    cloneElement(head, {
      selected: eligibleIndices.length > 0 && selectedEligible.length === eligibleIndices.length,
      indeterminate: selectedEligible.length > 0 && selectedEligible.length < eligibleIndices.length,
      multiSelectable: multiSelectable && eligibleIndices.length > 0,
      selectable,
      onSelect: (value, event) => {
        head.props.onSelect?.(value, event);
        if (event.defaultPrevented) return;
        onRowSelect?.(
          value
            ? rows.flatMap((_, index) =>
                selectedIndices.includes(index) || eligibleIndices.includes(index) ? [index] : [],
              )
            : selectedIndices.filter((index) => !eligibleIndices.includes(index)),
        );
      },
    });
  let rowIndex = 0;
  const decorateRow = (row: ReactElement<TableRowProps>) => {
    const idx = rowIndex++;
    return cloneElement(row, {
      idx,
      selectable: row.props.selectable ?? selectable,
      onSelect: (index, selected) => {
        row.props.onSelect?.(index, selected);
        selectRow(index);
      },
    });
  };
  const decorateSection = (section: ReactNode): ReactNode => {
    if (!isValidElement<{ children?: ReactNode }>(section)) return section;
    return cloneElement(
      section,
      {},
      flatten(section.props.children).map((child, index) => {
        if (isValidElement<TableHeadProps>(child) && child.type === TableHead)
          return cloneElement(decorateHead(child), { key: child.key ?? index });
        if (isValidElement<TableRowProps>(child) && child.type === TableRow)
          return cloneElement(decorateRow(child), { key: child.key ?? index });
        return child;
      }),
    );
  };
  return (
    <table
      {...other}
      className={cn(
        'rt-table-table',
        'bg-(--rt-color-white) border-collapse text-(length:--table-font-size) w-full',
        materialRoot,
        materialDescendants,
        theme?.table,
        className,
      )}
    >
      {structure}
      {explicitHeads.length ? (
        explicitHeads.map(decorateSection)
      ) : (
        <thead className={cn('rt-table-head', 'pb-[calc(0.3*var(--unit))] whitespace-nowrap', theme?.head)}>
          {heads.map((head, index) => cloneElement(decorateHead(head), { key: head.key ?? index }))}
        </thead>
      )}
      {explicitBodies.length ? (
        explicitBodies.map(decorateSection)
      ) : (
        <tbody>{rows.map((row, index) => cloneElement(decorateRow(row), { key: row.key ?? index }))}</tbody>
      )}
      {customSections}
      {footer}
    </table>
  );
}
export default Table;
