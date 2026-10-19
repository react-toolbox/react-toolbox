'use client';
import './tokens.css';
import '../chip/tokens.css';
import '../input/tokens.css';
import { Combobox as Primitive } from '@base-ui/react/combobox';
import { useRender } from '@base-ui/react/use-render';
import { createContext, useContext, useId, useRef, type ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import { surfaceClasses, optionClasses, focusClasses } from '../foundations/styles/composition';

const InputIdContext = createContext<string | undefined>(undefined);

export type AutocompleteRootProps<
  Value,
  Multiple extends boolean | undefined = false,
  Item = Value,
> = Primitive.Root.Props<Value, Multiple, Item>;
export function AutocompleteRoot<Value, Multiple extends boolean | undefined = false, Item = Value>(
  props: AutocompleteRootProps<Value, Multiple, Item>,
) {
  const fallbackId = useId();
  const id = props.id ?? fallbackId;
  return (
    <InputIdContext value={id}>
      <Primitive.Root {...props} id={id} />
    </InputIdContext>
  );
}
export type AutocompletePortalProps = ComponentProps<typeof Primitive.Portal>;
export function AutocompletePortal(props: AutocompletePortalProps) {
  return <Primitive.Portal {...props} />;
}
export type AutocompleteSelectionProps = ComponentProps<typeof Primitive.Value>;
export function AutocompleteSelection(props: AutocompleteSelectionProps) {
  return <Primitive.Value {...props} />;
}
export type AutocompleteCollectionProps = ComponentProps<typeof Primitive.Collection>;
export function AutocompleteCollection(props: AutocompleteCollectionProps) {
  return <Primitive.Collection {...props} />;
}
export type AutocompleteItemIndicatorProps = ComponentProps<typeof Primitive.ItemIndicator>;
export function AutocompleteItemIndicator(props: AutocompleteItemIndicatorProps) {
  return <Primitive.ItemIndicator {...props} />;
}
export type AutocompleteGroupProps = ComponentProps<typeof Primitive.Group>;
export function AutocompleteGroup(props: AutocompleteGroupProps) {
  return <Primitive.Group {...props} />;
}
export type AutocompleteRowProps = ComponentProps<typeof Primitive.Row>;
export function AutocompleteRow(props: AutocompleteRowProps) {
  return <Primitive.Row {...props} />;
}
export type AutocompleteLabelProps = ComponentProps<'label'>;
/** Labels the search input. Match htmlFor when supplying a custom input id. */
export function AutocompleteLabel({ className, ...props }: AutocompleteLabelProps) {
  const id = useContext(InputIdContext);
  return (
    <label
      data-slot="AutocompleteLabel"
      htmlFor={id}
      {...props}
      className={cn(
        'block font-(family-name:--preferred-font) text-(length:--input-label-font-size) leading-[1.4] text-(--input-text-label-color)',
        className,
      )}
    />
  );
}
export type AutocompleteInputGroupProps = ComponentProps<typeof Primitive.InputGroup>;
export function AutocompleteInputGroup({ className, ...props }: AutocompleteInputGroupProps) {
  return (
    <Primitive.InputGroup
      data-slot="AutocompleteInputGroup"
      {...props}
      className={(state) =>
        cn(
          "box-border [&_*]:box-border relative flex min-h-[max(48px,var(--input-field-height))] items-center border-0 font-(family-name:--preferred-font) [box-shadow:inset_0_-1px_0_var(--input-text-bottom-border-color)] focus-within:[box-shadow:inset_0_-2px_0_var(--input-text-highlight-color)] data-disabled:[box-shadow:none] data-disabled:after:absolute data-disabled:after:inset-x-0 data-disabled:after:bottom-0 data-disabled:after:[border-bottom:1px_dotted_var(--input-text-disabled-color)] data-disabled:after:content-['']",
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteInputProps = ComponentProps<typeof Primitive.Input>;
export function AutocompleteInput({ className, ...props }: AutocompleteInputProps) {
  return (
    <Primitive.Input
      data-slot="AutocompleteInput"
      {...props}
      className={(state) =>
        cn(
          'box-border min-h-[max(48px,var(--input-field-height))] min-w-0 flex-1 border-0 bg-(--input-text-background-color) font-(family-name:--preferred-font) py-(--input-field-padding) text-(length:--input-field-font-size) leading-[1.4] text-(--input-text-input-element-color) outline-none disabled:text-(--input-text-disabled-text-color)',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export function AutocompleteTrigger({ className, ...props }: AutocompleteTriggerProps) {
  return (
    <Primitive.Trigger
      data-slot="AutocompleteTrigger"
      {...props}
      className={(state) =>
        cn(
          focusClasses,
          'flex size-[48px] shrink-0 items-center justify-center border-0 bg-transparent text-(--rt-color-text-secondary) disabled:opacity-50',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteClearProps = ComponentProps<typeof Primitive.Clear>;
export function AutocompleteClear({ className, ...props }: AutocompleteClearProps) {
  return (
    <Primitive.Clear
      data-slot="AutocompleteClear"
      {...props}
      className={(state) =>
        cn(
          focusClasses,
          'flex size-[48px] shrink-0 items-center justify-center border-0 bg-transparent text-(--rt-color-text-secondary)',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompletePositionerProps = ComponentProps<typeof Primitive.Positioner>;
export function AutocompletePositioner({ className, ...props }: AutocompletePositionerProps) {
  return (
    <Primitive.Positioner
      data-slot="AutocompletePositioner"
      sideOffset={4}
      {...props}
      className={(state) => cn('z-400 outline-none', typeof className === 'function' ? className(state) : className)}
    />
  );
}
export type AutocompletePopupProps = ComponentProps<typeof Primitive.Popup>;
interface AutocompletePopupSurfaceProps {
  elementProps: ComponentProps<'div'>;
  state: Primitive.Popup.State;
  render: AutocompletePopupProps['render'];
}
/** Base UI resolves stateful styles before rendering, so theme aliases bind to the actual inline tokens. */
function AutocompletePopupSurface({ elementProps, state, render }: AutocompletePopupSurfaceProps) {
  const theme = usePortalTheme(elementProps.style);
  return useRender({
    render: typeof render === 'function' ? (props) => render(props, state) : render,
    props: { ...elementProps, ...theme, style: { ...theme.style, ...elementProps.style } },
  });
}
export function AutocompletePopup({ className, style, render, ...props }: AutocompletePopupProps) {
  return (
    <Primitive.Popup
      data-slot="AutocompletePopup"
      {...props}
      style={style}
      render={(elementProps, state) => (
        <AutocompletePopupSurface elementProps={elementProps} state={state} render={render} />
      )}
      className={(state) =>
        cn(
          surfaceClasses,
          'bg-(--autocomplete-suggestions-background) text-(--rt-color-text) rounded-[calc(0.2*var(--unit))] min-w-(--anchor-width) max-h-(--available-height) overflow-y-auto py-(--input-field-padding) [box-shadow:var(--shadow-8p)] origin-(--transform-origin) transition-[opacity,scale] duration-(--animation-duration-enter) ease-(--animation-curve-linear-out-slow-in) data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-(--animation-duration-exit) data-ending-style:ease-(--animation-curve-fast-out-linear-in) motion-reduce:transition-none',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteListProps = ComponentProps<typeof Primitive.List>;
export function AutocompleteList({ className, ...props }: AutocompleteListProps) {
  return (
    <Primitive.List
      data-slot="AutocompleteList"
      {...props}
      className={(state) => cn('outline-none', typeof className === 'function' ? className(state) : className)}
    />
  );
}
export type AutocompleteItemProps = ComponentProps<typeof Primitive.Item>;
export function AutocompleteItem({ className, onPointerDownCapture, onMouseUp, ...props }: AutocompleteItemProps) {
  const touch = useRef(false);
  return (
    <Primitive.Item
      data-slot="AutocompleteItem"
      {...props}
      onPointerDownCapture={(event) => {
        onPointerDownCapture?.(event);
        touch.current = event.pointerType === 'touch';
        /** Base UI 1.9 cancels pointer-down, which suppresses WebKit's touch click.
         * Keep native taps and let the primitive's click handler select exactly once. */
        if (touch.current && !event.defaultPrevented) event.preventBaseUIHandler();
      }}
      onMouseUp={(event) => {
        onMouseUp?.(event);
        /** A touch tap is not the primitive's mouse drag-to-select interaction. */
        if (touch.current) event.preventBaseUIHandler();
      }}
      className={(state) =>
        cn(
          optionClasses,
          'min-h-[max(48px,var(--input-field-height))] px-[calc(1.6*var(--unit))] py-(--autocomplete-suggestion-padding) text-(length:--input-field-font-size) leading-[1.4] data-highlighted:bg-(--autocomplete-suggestion-active-background)',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteGroupLabelProps = ComponentProps<typeof Primitive.GroupLabel>;
export function AutocompleteGroupLabel({ className, ...props }: AutocompleteGroupLabelProps) {
  return (
    <Primitive.GroupLabel
      data-slot="AutocompleteGroupLabel"
      {...props}
      className={(state) =>
        cn(
          'px-[calc(1.6*var(--unit))] py-(--input-field-padding) text-(length:--font-size-small) font-medium text-(--rt-color-text-secondary)',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteEmptyProps = ComponentProps<typeof Primitive.Empty>;
export function AutocompleteEmpty({ className, ...props }: AutocompleteEmptyProps) {
  return (
    <Primitive.Empty
      data-slot="AutocompleteEmpty"
      {...props}
      className={(state) =>
        cn(
          'px-[calc(1.6*var(--unit))] py-(--input-field-padding) text-(length:--font-size-small) leading-[24px] text-(--rt-color-text-secondary) empty:hidden',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteStatusProps = ComponentProps<typeof Primitive.Status>;
export function AutocompleteStatus({ className, ...props }: AutocompleteStatusProps) {
  return (
    <Primitive.Status
      data-slot="AutocompleteStatus"
      {...props}
      className={(state) =>
        cn(
          'px-[calc(1.6*var(--unit))] py-(--input-field-padding) text-(length:--font-size-small) leading-[24px] text-(--rt-color-text-secondary) empty:hidden',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteChipsProps = ComponentProps<typeof Primitive.Chips>;
export function AutocompleteChips({ className, ...props }: AutocompleteChipsProps) {
  return (
    <Primitive.Chips
      data-slot="AutocompleteChips"
      {...props}
      className={(state) =>
        cn(
          'flex min-h-[max(48px,var(--input-field-height))] flex-wrap items-center gap-[8px]',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteChipProps = ComponentProps<typeof Primitive.Chip>;
export function AutocompleteChip({ className, ...props }: AutocompleteChipProps) {
  return (
    <Primitive.Chip
      data-slot="AutocompleteChip"
      {...props}
      className={(state) =>
        cn(
          'flex min-h-(--chip-height) items-center gap-[8px] rounded-full bg-(--chip-background) px-(--chip-padding) text-(length:--chip-font-size) leading-[1.4] text-(--chip-color) outline-none focus-visible:outline-2 focus-visible:outline-(--rt-color-primary)',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteChipRemoveProps = ComponentProps<typeof Primitive.ChipRemove>;
export function AutocompleteChipRemove({ className, ...props }: AutocompleteChipRemoveProps) {
  return (
    <Primitive.ChipRemove
      data-slot="AutocompleteChipRemove"
      {...props}
      className={(state) =>
        cn(
          focusClasses,
          'flex size-(--chip-remove-size) items-center justify-center rounded-full border-0 bg-transparent text-inherit',
          typeof className === 'function' ? className(state) : className,
        )
      }
    />
  );
}
export type AutocompleteSeparatorProps = ComponentProps<typeof Primitive.Separator>;
export function AutocompleteSeparator({ className, ...props }: AutocompleteSeparatorProps) {
  return (
    <Primitive.Separator
      data-slot="AutocompleteSeparator"
      {...props}
      className={(state) =>
        cn('my-[8px] h-px bg-(--rt-color-divider)', typeof className === 'function' ? className(state) : className)
      }
    />
  );
}
