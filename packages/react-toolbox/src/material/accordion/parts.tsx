'use client';

import { Accordion as Primitive } from '@base-ui/react/accordion';
import type { ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { forcedColorsFocusClasses, surfaceClasses } from '../foundations/styles/composition';

export interface AccordionRootProps<Value = string> extends Primitive.Root.Props<Value> {
  /** The expanded item values. Use with onValueChange for controlled expansion. */
  value?: Value[];
  /** The initially expanded item values for uncontrolled expansion. */
  defaultValue?: Value[];
  /** Called when an item requests expansion or collapse. */
  onValueChange?: (value: Value[], eventDetails: Primitive.Root.ChangeEventDetails) => void;
  /** Allow more than one expanded panel at a time. */
  multiple?: boolean;
  /** Disable all triggers. */
  disabled?: boolean;
}

export function AccordionRoot<Value = string>({
  className,
  multiple = false,
  disabled = false,
  ...props
}: AccordionRootProps<Value>) {
  return (
    <Primitive.Root
      data-slot="AccordionRoot"
      {...props}
      multiple={multiple}
      disabled={disabled}
      className={(state) =>
        cn(surfaceClasses, 'flow-root w-full', typeof className === 'function' ? className(state) : className)
      }
    />
  );
}

export interface AccordionItemProps extends ComponentProps<typeof Primitive.Item> {
  /** A unique value; supply one when using value or defaultValue on the root. */
  value?: Primitive.Item.Props['value'];
  /** Disable this item's trigger. */
  disabled?: boolean;
}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <Primitive.Item
      data-slot="AccordionItem"
      {...props}
      className={(state) =>
        cn(
          'border-0 border-b border-solid border-(--rt-color-divider) bg-(--rt-color-background) text-(--rt-color-text) [box-shadow:var(--shadow-2p)] last:border-b-0 data-open:my-[16px] data-open:border-b-0',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}

export type AccordionHeaderProps = ComponentProps<typeof Primitive.Header>;
/** Defaults to h3; use render={<h2 />} to match the surrounding heading hierarchy. */
export function AccordionHeader({ className, ...props }: AccordionHeaderProps) {
  return (
    <Primitive.Header
      data-slot="AccordionHeader"
      {...props}
      className={(state) => cn('m-0', typeof className === 'function' ? className(state) : className)}
    />
  );
}

export type AccordionTriggerProps = ComponentProps<typeof Primitive.Trigger>;
/** Put the visible label here, and keep other interactive controls in the panel. */
export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <Primitive.Trigger
      data-slot="AccordionTrigger"
      {...props}
      className={(state) =>
        cn(
          'outline-none',
          forcedColorsFocusClasses,
          'group flex min-h-[48px] w-full items-center justify-between gap-[16px] border-0 bg-transparent px-[24px] py-[12px] text-start font-(family-name:--preferred-font) text-[15px] leading-[24px] font-normal text-inherit data-panel-open:min-h-[64px] data-panel-open:py-[20px] focus-visible:bg-(--rt-color-divider) disabled:cursor-not-allowed disabled:opacity-50',
          typeof className === 'function' ? className(state) : className,
        )
      }
    >
      {children}
      <svg
        data-slot="AccordionIndicator"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        className="size-[24px] shrink-0 fill-current text-(--rt-color-text-secondary) opacity-60 transition-transform duration-(--animation-duration) ease-(--animation-curve-default) group-data-panel-open:rotate-180 group-hover:opacity-100 motion-reduce:transition-none"
      >
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
      </svg>
    </Primitive.Trigger>
  );
}

export interface AccordionPanelProps extends ComponentProps<typeof Primitive.Panel> {
  /** Keep closed content mounted, for example to preserve local form state. */
  keepMounted?: boolean;
}

export function AccordionPanel({ className, ...props }: AccordionPanelProps) {
  return (
    <Primitive.Panel
      data-slot="AccordionPanel"
      {...props}
      className={(state) =>
        cn(
          'px-[24px] pb-[16px] text-[14px] leading-[24px]',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
