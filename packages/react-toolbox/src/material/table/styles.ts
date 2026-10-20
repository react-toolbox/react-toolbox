import '../checkbox/tokens.css';

export const checkboxCellClasses = [
  'rt-table-checkboxCell',
  'relative',
  '[.rt-table-rowCell&]:pe-[5px] [.rt-table-rowCell&]:w-[calc(1.8*var(--unit))]',
  '[.rt-table-rowCell&>*]:m-0',
  '[.rt-table-headCell&]:pe-[5px] [.rt-table-headCell&]:w-[calc(1.8*var(--unit))]',
  '[.rt-table-headCell&>*]:m-0',
  /** The 48px hit area overlaps cell padding, preserving the 48px row and 24px keyline. */
  '[&>.rt-checkbox-field]:absolute [&>.rt-checkbox-field]:top-[50%] [&>.rt-checkbox-field]:transform-[translateY(-50%)] [&>.rt-checkbox-field]:flex [&>.rt-checkbox-field]:items-center [&>.rt-checkbox-field]:justify-center [&>.rt-checkbox-field]:p-0 [&>.rt-checkbox-field]:w-[max(48px,var(--checkbox-size))] [&>.rt-checkbox-field]:inset-s-[calc(2.4*var(--unit)-(max(48px,var(--checkbox-size))-var(--checkbox-size))/2)]',
].join(' ');
