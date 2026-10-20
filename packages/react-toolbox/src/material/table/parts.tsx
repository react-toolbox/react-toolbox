'use client';
import './tokens.css';
import { useState, useCallback, type ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { TableCellContext, TableSelectionContext } from './selection';

export interface TableRootProps extends ComponentProps<'table'> {
  selectionMode?: 'none' | 'single' | 'multiple';
  selected?: readonly string[];
  defaultSelected?: readonly string[];
  onSelectionChange?: (selected: string[]) => void;
}
/** Native table composition with selection keyed by row value, never child order. */
export function TableRoot({
  children,
  className,
  selectionMode = 'none',
  selected: controlled,
  defaultSelected = [],
  onSelectionChange,
  ...props
}: TableRootProps) {
  const [internal, setInternal] = useState(defaultSelected);
  const selected = controlled ?? internal;
  const [rows, setRows] = useState<ReadonlyMap<string, boolean>>(new Map());
  const register = useCallback((value: string, disabled: boolean) => {
    setRows((current) => new Map(current).set(value, disabled));
    return () =>
      setRows((current) => {
        const next = new Map(current);
        next.delete(value);
        return next;
      });
  }, []);
  const change = (values: string[]) => {
    if (controlled === undefined) setInternal(values);
    onSelectionChange?.(values);
  };
  return (
    <TableSelectionContext
      value={{
        mode: selectionMode,
        selected,
        rows,
        register,
        select: (value, checked) => {
          if (selectionMode === 'none' || rows.get(value)) return;
          change(
            checked
              ? selectionMode === 'single'
                ? [value]
                : [...new Set([...selected, value])]
              : selected.filter((key) => key !== value),
          );
        },
        selectAll: (checked) => {
          if (selectionMode !== 'multiple') return;
          const visible = [...rows].filter(([, disabled]) => !disabled).map(([key]) => key);
          change(checked ? [...new Set([...selected, ...visible])] : selected.filter((key) => !visible.includes(key)));
        },
      }}
    >
      <table
        data-slot="TableRoot"
        {...props}
        className={cn(
          'box-border [&_*]:box-border w-full border-collapse bg-(--rt-color-background) font-(family-name:--preferred-font) text-(length:--table-font-size)',
          className,
        )}
      >
        {children}
      </table>
    </TableSelectionContext>
  );
}
export type TableHeaderProps = ComponentProps<'thead'>;
export function TableHeader(props: TableHeaderProps) {
  return (
    <TableCellContext value="th">
      <thead data-slot="TableHeader" {...props} />
    </TableCellContext>
  );
}
export type TableBodyProps = ComponentProps<'tbody'>;
export function TableBody(props: TableBodyProps) {
  return (
    <TableCellContext value="td">
      <tbody data-slot="TableBody" {...props} />
    </TableCellContext>
  );
}
export type TableFooterProps = ComponentProps<'tfoot'>;
export function TableFooter(props: TableFooterProps) {
  return (
    <TableCellContext value="td">
      <tfoot data-slot="TableFooter" {...props} />
    </TableCellContext>
  );
}
export type TableCaptionProps = ComponentProps<'caption'>;
export function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="TableCaption"
      {...props}
      className={cn('p-[24px] text-start text-[20px] leading-[28px] font-medium', className)}
    />
  );
}
