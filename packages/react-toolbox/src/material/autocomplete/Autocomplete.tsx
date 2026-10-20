'use client';
import './tokens.css';
import '../chip/tokens.css';
import '../input/tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import React, { useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import type { ChipEvent } from '../chip/Chip';
import {
  AutocompleteRoot,
  AutocompleteInput,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompletePopup,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteClear,
  AutocompleteChips,
  AutocompleteChip,
  AutocompleteChipRemove,
  AutocompleteStatus,
} from './parts';
import useFormReset from '../foundations/forms/useFormReset';
import Input, { type InputProps, type InputHandle, type InputElement } from '../input/Input';

/** Bridge Base UI's DOM ref and change event to Input, retaining Input's complete field presentation. */
function AutocompleteInputField({
  ref,
  inputRef,
  className: _className,
  rootClassName,
  onChange,
  ...props
}: Omit<InputProps, 'ref' | 'onChange'> & {
  ref?: React.Ref<InputElement>;
  inputRef: React.RefObject<InputHandle | null>;
  rootClassName?: string;
  onChange?: React.ChangeEventHandler<InputElement>;
}) {
  useImperativeHandle(ref, () => inputRef.current!.inputElement!, [inputRef]);
  return <Input {...props} ref={inputRef} className={rootClassName} onChange={(_, event) => onChange?.(event)} />;
}

export type AutocompleteValue = string | string[] | Record<string, React.ReactNode>;
export interface AutocompleteOption {
  value: string;
  label: React.ReactNode;
  /** Plain text used for matching and the single-value input. */
  textValue?: string;
  disabled?: boolean;
  group?: string;
}
export type AutocompleteSource =
  | Record<string, React.ReactNode>
  | readonly (string | readonly [string, React.ReactNode] | AutocompleteOption)[];
export type AutocompleteEvent = ChipEvent | React.ChangeEvent<HTMLSelectElement>;
export interface AutocompleteBaseProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'multiple' | 'ref'> {
  allowCreate?: boolean;
  /** Keep selected values focusable and submitted while preventing edits and validation. */
  readOnly?: boolean;
  /** Show a control that clears the selected value(s). */
  clearable?: boolean;
  clearLabel?: string;
  emptyMessage?: React.ReactNode;
  loading?: boolean;
  loadingMessage?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: 'auto' | 'up' | 'down';
  keepFocusOnChange?: boolean;
  onBlur?: (event: React.FocusEvent<InputElement>, active?: string | null) => void;
  onQueryChange?: (query: string) => void;
  /** Controlled search text. Uncontrolled single-value queries restore the selected label on blur. */
  query?: string;
  selectedPosition?: 'above' | 'below' | 'none';
  showSelectedWhenNotInSource?: boolean;
  showSuggestionsWhenValueIsSet?: boolean;
  source?: AutocompleteSource;
  suggestionMatch?: 'disabled' | 'start' | 'anywhere' | 'word' | 'none';
  ref?: React.Ref<InputHandle>;
}
export interface AutocompleteSingleProps extends AutocompleteBaseProps {
  multiple: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: AutocompleteEvent) => void;
}
export interface AutocompleteArrayProps extends AutocompleteBaseProps {
  multiple?: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[], event: AutocompleteEvent) => void;
}
export interface AutocompleteObjectProps extends AutocompleteBaseProps {
  multiple?: true;
  value?: Record<string, React.ReactNode>;
  defaultValue?: Record<string, React.ReactNode>;
  onChange?: (value: Record<string, React.ReactNode>, event: AutocompleteEvent) => void;
}
export type AutocompleteProps = AutocompleteSingleProps | AutocompleteArrayProps | AutocompleteObjectProps;
const emptySource: AutocompleteSource = {};
function normalise(value: React.ReactNode) {
  const sdiak =
    'áâäąáâäąččććççĉĉďđďđééěëēėęéěëēėęĝĝğğġġģģĥĥħħíîíîĩĩīīĭĭįįi̇ıĵĵķķĸĺĺļļŀŀłłĺľĺľňńņŋŋņňńŉóöôőøōōóöőôøřřŕŕŗŗššśśŝŝşşţţťťŧŧũũūūŭŭůůűűúüúüűųųŵŵýyŷŷýyžžźźżżß';
  const bdiak =
    'AAAAAAAACCCCCCCCDDDDEEEEEEEEEEEEEGGGGGGGGHHHHIIIIIIIIIIIIIIJJKKKLLLLLLLLLLLLNNNNNNNNNOOOOOOOOOOOORRRRRRSSSSSSSSTTTTTTUUUUUUUUUUUUUUUUUWWYYYYYYZZZZZZS';
  return String(value)
    .split('')
    .map((letter) => (sdiak.includes(letter) ? bdiak.charAt(sdiak.indexOf(letter)) : letter))
    .join('')
    .toLowerCase()
    .trim();
}
export function Autocomplete(props: AutocompleteSingleProps): React.JSX.Element;
export function Autocomplete(props: AutocompleteArrayProps): React.JSX.Element;
export function Autocomplete(props: AutocompleteObjectProps): React.JSX.Element;
export function Autocomplete(props: AutocompleteProps): React.JSX.Element;
export function Autocomplete(props: AutocompleteProps) {
  const {
    allowCreate = false,
    clearable = false,
    clearLabel = 'Clear selection',
    emptyMessage,
    loading = false,
    loadingMessage = 'Loading…',
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    name,
    form,
    required,
    readOnly = false,
    defaultValue,
    className = '',
    direction = 'auto',
    disabled = false,
    error,
    keepFocusOnChange = false,
    label,
    multiple = true,
    onBlur,
    onChange: _onChange,
    onFocus,
    onKeyDown,
    onKeyUp,
    onQueryChange,
    query: controlledQuery,
    selectedPosition = 'above',
    showSelectedWhenNotInSource = false,
    showSuggestionsWhenValueIsSet = false,
    source = emptySource,
    suggestionMatch = 'start',
    value: controlledValue,
    id: suppliedId,
    ref,
    ...others
  } = props;
  const [internalValue, setValue] = useState<AutocompleteValue>(defaultValue ?? (multiple ? [] : ''));
  const value = controlledValue ?? internalValue;
  const native = useRef<HTMLSelectElement>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const generatedId = useId();
  const id = suppliedId || `autocomplete-${generatedId}`;
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<InputHandle>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus: () => input.current?.focus(),
      blur: () => input.current?.blur(),
      get inputElement() {
        return input.current?.inputElement ?? null;
      },
    }),
    [],
  );
  const options: AutocompleteOption[] = Array.isArray(source)
    ? source.map((item) =>
        typeof item === 'string'
          ? { value: item, label: item }
          : 'value' in item
            ? item
            : { value: item[0], label: item[1] },
      )
    : Object.entries(source).map(([value, label]) => ({ value, label }));
  const optionMap = new Map(options.map((item) => [item.value, item]));
  const sourceMap = new Map(options.map((item) => [item.value, item.label]));
  const textFor = (key: string) =>
    optionMap.get(key)?.textValue ??
    (typeof sourceMap.get(key) === 'string' || typeof sourceMap.get(key) === 'number'
      ? String(sourceMap.get(key))
      : key);
  const queryFor = (next: AutocompleteValue | undefined) => (!multiple && next != null ? textFor(String(next)) : '');
  const selectedQuery = queryFor(value);
  const [internalQuery, setQuery] = useState(selectedQuery);
  const query = controlledQuery ?? internalQuery;
  const [internalOpen, setOpen] = useState(defaultOpen);
  const focus = !disabled && !readOnly && (controlledOpen ?? internalOpen);
  const setFocus = (next: boolean) => {
    if ((disabled || readOnly) && next) return;
    if (controlledOpen === undefined) setOpen(next);
    if (next !== focus) onOpenChange?.(next);
  };
  const [resolvedDirection, setDirection] = useState(direction);
  const [showAll, setShowAll] = useState(showSuggestionsWhenValueIsSet);
  const active = useRef<string | null>(null);
  /** Base UI clicks highlighted items internally; recover the original React keyboard/pointer event. */
  const interactions = useRef(new WeakMap<Event, ChipEvent>());
  const rememberInteraction = (event: ChipEvent) => {
    interactions.current.set(event.nativeEvent, event);
  };
  const clearQuery = useRef(false);
  const objectValue = value != null && typeof value === 'object' && !Array.isArray(value);
  const vals = multiple ? value : [value];
  const stringValues = (Array.isArray(vals) ? vals : vals && typeof vals === 'object' ? Object.keys(vals) : []).map(
    String,
  );
  const selected = new Map(
    stringValues
      .filter((key) => key && (sourceMap.has(key) || showSelectedWhenNotInSource))
      .map((key) => [
        key,
        showSelectedWhenNotInSource && objectValue
          ? (value as Record<string, React.ReactNode>)[key]
          : (sourceMap.get(key) ?? key),
      ]),
  );
  const matches = (candidate: React.ReactNode) => {
    const normalized = normalise(candidate),
      text = normalise(query);
    if (suggestionMatch === 'disabled') return true;
    if (suggestionMatch === 'start') return normalized.startsWith(text);
    if (suggestionMatch === 'anywhere') return normalized.includes(text);
    if (suggestionMatch === 'word')
      return new RegExp(`\\b${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(normalized);
    return Boolean(normalized);
  };
  const suggestions = new Map(
    [...sourceMap].filter(([key]) =>
      multiple ? !selected.has(key) && matches(textFor(key)) : !query || showAll || matches(textFor(key)),
    ),
  );
  if (allowCreate && query && !sourceMap.has(query) && (!multiple || !selected.has(query)))
    suggestions.set(query, `Create "${query}"`);
  const status = loading ? loadingMessage : suggestions.size === 0 ? emptyMessage : null;
  useFormReset(native, () => {
    const next = controlledValue ?? defaultValue ?? (multiple ? [] : '');
    if (controlledValue === undefined) setValue(next);
    if (controlledQuery === undefined) setQuery(queryFor(next));
    if (native.current) {
      const values = typeof next === 'string' ? [next] : Array.isArray(next) ? next : Object.keys(next);
      Array.from(native.current.options).forEach((option) => {
        option.selected = values.includes(option.value);
      });
    }
    setValidationMessage('');
    setFocus(false);
  });
  useEffect(() => {
    if (disabled || readOnly) setFocus(false);
  }, [disabled, readOnly]);
  const previousValue = useRef(value);
  useEffect(() => {
    /** Remote results can replace source while the user is typing. Only an actual selection change should replace that in-progress query. */
    if (!multiple && controlledQuery === undefined && (previousValue.current !== value || !focus))
      setQuery(selectedQuery);
    previousValue.current = value;
  }, [controlledQuery, selectedQuery, multiple, value]);
  const change = (values: string[] | Record<string, React.ReactNode>, event: AutocompleteEvent) => {
    if (disabled || readOnly) return;
    let nextQuery = '';
    if (props.multiple === false) {
      const next = (Array.isArray(values) ? values[0] : Object.keys(values)[0]) ?? '';
      if (controlledValue === undefined) setValue(next);
      nextQuery = queryFor(next);
      props.onChange?.(next, event);
    } else if (objectValue) {
      const next = Array.isArray(values)
        ? Object.fromEntries(values.map((key) => [key, sourceMap.get(key) ?? key]))
        : values;
      if (controlledValue === undefined) setValue(next);
      (props.onChange as AutocompleteObjectProps['onChange'])?.(next, event);
    } else {
      const next = Array.isArray(values) ? values : Object.keys(values);
      if (controlledValue === undefined) setValue(next);
      (props.onChange as AutocompleteArrayProps['onChange'])?.(next, event);
    }
    setValidationMessage('');
    setQuery(nextQuery);
    setShowAll(showSuggestionsWhenValueIsSet);
    if (!keepFocusOnChange) {
      setFocus(false);
      if (event.type !== 'keydown') input.current?.blur();
    }
    onQueryChange?.(nextQuery);
  };
  const renderSelected = () =>
    multiple ? (
      <AutocompleteChips className={cn('rt-autocomplete-values', 'min-h-0 gap-0 p-[0_0_calc(var(--unit)/2)_0]')}>
        {[...selected].map(([key, text]) => (
          <AutocompleteChip
            key={key}
            data-react-toolbox="chip"
            onKeyDown={rememberInteraction}
            className={cn(
              'rt-autocomplete-value rt-chip-chip rt-chip-deletable',
              'block relative min-h-0 h-(--chip-height) leading-(--chip-height) m-(--autocomplete-value-margin) me-(--chip-margin-right) max-w-full overflow-hidden text-ellipsis whitespace-nowrap pe-[calc(var(--chip-remove-size)+2*var(--chip-remove-margin))]',
            )}
          >
            {text}
            <AutocompleteChipRemove
              onClick={rememberInteraction}
              aria-label={typeof text === 'string' ? `Remove ${text}` : 'Remove'}
              className="rt-chip-delete cursor-pointer inline-block m-(--chip-remove-margin) p-(--chip-remove-margin) absolute end-0 top-0 disabled:cursor-default"
            >
              <svg
                viewBox="0 0 40 40"
                aria-hidden="true"
                focusable="false"
                className="rt-chip-deleteIcon [background:var(--chip-remove-background)] rounded-(--chip-remove-size) align-top [.rt-chip-delete:hover_&]:[background:var(--chip-remove-background-hover)]"
              >
                <path
                  className="fill-transparent stroke-(--chip-remove-color) [stroke-width:var(--chip-remove-stroke-width)]"
                  d="M 12,12 L 28,28 M 28,12 L 12,28"
                />
              </svg>
            </AutocompleteChipRemove>
          </AutocompleteChip>
        ))}
      </AutocompleteChips>
    ) : null;
  const renderSuggestion = (key: string, text: React.ReactNode) => (
    <AutocompleteItem
      key={key}
      value={key}
      onClick={rememberInteraction}
      onMouseUp={rememberInteraction}
      disabled={loading || optionMap.get(key)?.disabled}
      className={(state) =>
        cn(
          'rt-autocomplete-suggestion',
          'cursor-pointer',
          state.disabled && '[&&]:cursor-not-allowed opacity-50',
          state.highlighted && 'rt-autocomplete-active',
        )
      }
    >
      {text}
    </AutocompleteItem>
  );
  const groups = new Map<string | undefined, [string, React.ReactNode][]>();
  for (const entry of suggestions) {
    const group = optionMap.get(entry[0])?.group;
    groups.set(group, [...(groups.get(group) ?? []), entry]);
  }
  return (
    <AutocompleteRoot<string, boolean>
      id={id}
      multiple={multiple}
      disabled={disabled}
      readOnly={readOnly}
      value={multiple ? [...selected.keys()] : stringValues[0] || null}
      inputValue={query}
      items={[...groups.values()].flatMap((entries) => entries.map(([key]) => key))}
      filter={null}
      itemToStringLabel={textFor}
      open={focus && (suggestions.size > 0 || status != null)}
      onOpenChange={(next, details) => {
        if (!next && details.reason === 'item-press' && keepFocusOnChange) details.cancel();
        else setFocus(next);
      }}
      onItemHighlighted={(key) => {
        active.current = key ?? null;
      }}
      onInputValueChange={(text, details) => {
        /** Selection and blur restoration use domain labels, not Base UI's raw IDs. */
        if (details.reason !== 'input-change') return;
        const next = clearQuery.current ? '' : text;
        clearQuery.current = false;
        setQuery(next);
        setFocus(true);
        setShowAll(next ? false : showSuggestionsWhenValueIsSet);
        onQueryChange?.(next);
      }}
      onValueChange={(next, details) => {
        /** Editing a query must not clear the submitted single selection. */
        if (details.reason === 'input-clear' || details.reason === 'escape-key') {
          details.cancel();
          return;
        }
        const event = interactions.current.get(details.event);
        if (!event) return;
        const values = Array.isArray(next) ? [...next] : next == null ? [] : [next];
        /** Unrendered remote selections are still domain values, except when clearing everything. */
        if (multiple && details.reason !== 'clear-press')
          values.push(...stringValues.filter((key) => !selected.has(key)));
        const ordered = [
          ...values.filter((key) => !stringValues.includes(key)),
          ...stringValues.filter((key) => values.includes(key)),
        ];
        change(
          objectValue
            ? Object.fromEntries(
                ordered.map((key) => [
                  key,
                  stringValues.includes(key)
                    ? (value as Record<string, React.ReactNode>)[key]
                    : (sourceMap.get(key) ?? key),
                ]),
              )
            : ordered,
          event,
        );
      }}
    >
      <div
        data-react-toolbox="autocomplete"
        className={cn(
          'rt-autocomplete-autocomplete',
          'p-0 relative',
          materialRoot,
          materialDescendants,
          focus && 'rt-autocomplete-focus',
          className,
        )}
        ref={root}
      >
        <select
          ref={native}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          name={name}
          form={form}
          disabled={disabled}
          required={required && !readOnly}
          multiple={multiple}
          value={multiple ? stringValues : (stringValues[0] ?? '')}
          onChange={(event) =>
            change(
              Array.from(event.currentTarget.selectedOptions, (option) => option.value),
              event,
            )
          }
          onInvalid={(event) => {
            event.preventDefault();
            setValidationMessage(event.currentTarget.validationMessage);
            input.current?.focus();
          }}
        >
          {!multiple && <option value="" />}
          {[...new Set([...sourceMap.keys(), ...stringValues])].filter(Boolean).map((key) => (
            <option key={key} value={key} disabled={optionMap.get(key)?.disabled}>
              {textFor(key)}
            </option>
          ))}
        </select>
        {selectedPosition === 'above' ? renderSelected() : null}
        <AutocompleteInput
          id={id}
          disabled={disabled}
          aria-required={required || undefined}
          aria-busy={loading || undefined}
          autoComplete="off"
          onBlur={(event) => {
            setFocus(false);
            if (!multiple && controlledQuery === undefined) {
              setQuery(selectedQuery);
              if (query !== selectedQuery) onQueryChange?.(selectedQuery);
            }
            onBlur?.(event, active.current);
          }}
          onFocus={(event) => {
            onFocus?.(event);
            if (disabled || readOnly || event.defaultPrevented) {
              event.preventBaseUIHandler();
              return;
            }
            event.target.scrollTop = 0;
            setFocus(true);
            const client = root.current?.querySelector('[data-react-toolbox="input"]')?.getBoundingClientRect();
            setDirection(
              direction === 'auto'
                ? client &&
                  client.top > (window.innerHeight || document.documentElement.offsetHeight) / 2 + client.height
                  ? 'up'
                  : 'down'
                : direction,
            );
          }}
          onKeyDown={(event) => {
            rememberInteraction(event);
            onKeyDown?.(event);
            if (event.defaultPrevented || disabled || event.nativeEvent.isComposing) {
              event.preventBaseUIHandler();
              return;
            }
            clearQuery.current = event.key === 'Backspace' && showSuggestionsWhenValueIsSet && showAll;
          }}
          onKeyUp={onKeyUp}
          render={
            <AutocompleteInputField
              {...others}
              inputRef={input}
              error={error || validationMessage}
              label={label ? <span id={`${id}-label`}>{label}</span> : label}
              aria-labelledby={
                others['aria-labelledby'] ?? (!others['aria-label'] && label ? `${id}-label` : undefined)
              }
              rootClassName={cn(
                'rt-autocomplete-input',
                'relative [&>input]:pe-[calc(2*var(--input-chevron-offset)+2*var(--autocomplete-border-size))]',
                "[&::after]:[border-left:var(--autocomplete-border-size)_solid_transparent] [&::after]:[border-right:var(--autocomplete-border-size)_solid_transparent] [&::after]:[border-top:var(--autocomplete-border-size)_solid_var(--input-chevron-color)] [&::after]:[content:''] [&::after]:h-0 [&::after]:pointer-events-none [&::after]:absolute [&::after]:inset-e-(--input-chevron-offset) [&::after]:top-[50%] [&::after]:[transition:transform_var(--animation-duration)_var(--animation-curve-default)] [&::after]:w-0",
                '[&:focus-within:not(.rt-input-disabled)::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_87%)]',
                '[&.rt-input-disabled::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_38%)]',
              )}
            />
          }
        />
        <AutocompletePortal>
          <AutocompletePositioner
            anchor={() => input.current?.inputElement ?? null}
            side={resolvedDirection === 'up' ? 'top' : 'bottom'}
            sideOffset={0}
            align="start"
          >
            <AutocompletePopup className="w-(--anchor-width) max-h-(--autocomplete-overflow-max-height)">
              <AutocompleteStatus className="sr-only">{status}</AutocompleteStatus>
              <AutocompleteList
                aria-label={typeof label === 'string' ? label : others['aria-label']}
                aria-busy={loading || undefined}
                className={cn(
                  'rt-autocomplete-suggestions',
                  'm-0 p-0 overflow-y-auto max-h-(--autocomplete-overflow-max-height)',
                  resolvedDirection === 'up' && 'rt-autocomplete-up',
                )}
              >
                {status != null && (
                  <div aria-hidden="true" className="px-[calc(1.6*var(--unit))] py-(--autocomplete-suggestion-padding)">
                    {status}
                  </div>
                )}
                {[...groups].map(([group, entries]) =>
                  group ? (
                    <AutocompleteGroup key={group}>
                      <AutocompleteGroupLabel>{group}</AutocompleteGroupLabel>
                      {entries.map(([key, text]) => renderSuggestion(key, text))}
                    </AutocompleteGroup>
                  ) : (
                    entries.map(([key, text]) => renderSuggestion(key, text))
                  ),
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </AutocompletePositioner>
        </AutocompletePortal>
        {clearable && !readOnly && stringValues.some(Boolean) && (
          <AutocompleteClear
            onClick={rememberInteraction}
            keepMounted
            aria-label={clearLabel}
            className="h-auto w-auto text-(--input-text-highlight-color) p-(--unit)"
          >
            {clearLabel}
          </AutocompleteClear>
        )}
        {selectedPosition === 'below' ? renderSelected() : null}
      </div>
    </AutocompleteRoot>
  );
}
export default Autocomplete;
