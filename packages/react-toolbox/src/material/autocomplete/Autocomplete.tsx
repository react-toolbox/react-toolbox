'use client';
import './tokens.css';
import '../chip/tokens.css';
import '../input/tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { AutocompleteTheme } from './types';

import React, { useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import Chip, { type ChipEvent } from '../chip/Chip';
import useFormReset from '../foundations/forms/useFormReset';
import Input, { type InputProps, type InputHandle, type InputElement } from '../input/Input';

export type { AutocompleteTheme, AutocompleteClassNames } from './types';
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
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'theme' | 'multiple' | 'ref'> {
  allowCreate?: boolean;
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
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: AutocompleteTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: AutocompleteTheme;
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
    theme: legacyTheme,
    classNames,
    value: controlledValue,
    id: suppliedId,
    ref,
    ...others
  } = props;
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
  const focus = !disabled && (controlledOpen ?? internalOpen);
  const setFocus = (next: boolean) => {
    if (disabled && next) return;
    if (controlledOpen === undefined) setOpen(next);
    if (next !== focus) onOpenChange?.(next);
  };
  const [resolvedDirection, setDirection] = useState(direction);
  const [showAll, setShowAll] = useState(showSuggestionsWhenValueIsSet);
  const [active, setActive] = useState<string | null>(null);
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
  const keys = [...suggestions.keys()];
  const enabledKeys = keys.filter((key) => !optionMap.get(key)?.disabled);
  const status = loading ? loadingMessage : suggestions.size === 0 ? emptyMessage : null;
  const expanded = focus && (suggestions.size > 0 || status != null);
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
    if (disabled) setFocus(false);
  }, [disabled]);
  const previousValue = useRef(value);
  useEffect(() => {
    // Remote results can replace source while the user is typing. Only an
    // actual selection change should replace that in-progress query.
    if (!multiple && controlledQuery === undefined && (previousValue.current !== value || !focus))
      setQuery(selectedQuery);
    previousValue.current = value;
  }, [controlledQuery, selectedQuery, multiple, value]);
  useEffect(() => {
    if (focus)
      root.current
        ?.querySelector<HTMLElement>('[role="option"][aria-selected="true"]')
        ?.scrollIntoView?.({ block: 'nearest' });
  }, [active, focus]);
  const change = (values: string[] | Record<string, React.ReactNode>, event: AutocompleteEvent) => {
    if (disabled) return;
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
      input.current?.blur();
    }
    onQueryChange?.(nextQuery);
  };
  const select = (event: AutocompleteEvent, target: string) => {
    if (disabled || loading || optionMap.get(target)?.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    if (objectValue)
      change({ ...(value as Record<string, React.ReactNode>), [target]: sourceMap.get(target) ?? target }, event);
    else change([target, ...stringValues.filter((key) => key && key !== target)], event);
  };
  const renderSelected = () =>
    multiple ? (
      <div
        className={cn(
          'rt-autocomplete-values',
          'flex-row flex-wrap [list-style:none] m-0 p-[0_0_calc(var(--unit)/2)_0]',
          theme?.values,
        )}
      >
        {[...selected].map(([key, text]) => (
          <Chip
            key={key}
            className={cn(
              'rt-autocomplete-value',
              'm-(--autocomplete-value-margin) me-(--chip-margin-right)',
              theme?.value,
            )}
            deletable
            disabled={disabled}
            deleteLabel={typeof text === 'string' ? `Remove ${text}` : 'Remove'}
            onDeleteClick={(event) => {
              if (objectValue) {
                const remaining = { ...(value as Record<string, React.ReactNode>) };
                delete remaining[key];
                change(remaining, event);
              } else
                change(
                  stringValues.filter((selectedKey) => selectedKey !== key),
                  event,
                );
            }}
          >
            {text}
          </Chip>
        ))}
      </div>
    ) : null;
  const renderSuggestion = (key: string, text: React.ReactNode) => (
    <li
      id={`${id}-option-${keys.indexOf(key)}`}
      key={key}
      role="option"
      aria-selected={active === key}
      aria-disabled={optionMap.get(key)?.disabled || undefined}
      className={cn(
        'rt-autocomplete-suggestion',
        'cursor-pointer text-(length:--input-field-font-size) p-(--autocomplete-suggestion-padding)',
        theme?.suggestion,
        optionMap.get(key)?.disabled && '[&&]:cursor-not-allowed opacity-50',
        active === key &&
          cn(
            'rt-autocomplete-active',
            '[.rt-autocomplete-suggestion&]:bg-(--autocomplete-suggestion-active-background)',
            theme?.active,
          ),
      )}
      onMouseDown={(event) => {
        // Keep input focus; commit on click so touch scrolling never selects.
        if (event.button === 0) event.preventDefault();
      }}
      onClick={(event) => select(event, key)}
      onMouseOver={() => {
        if (!optionMap.get(key)?.disabled) setActive(key);
      }}
    >
      {text}
    </li>
  );
  const groups = new Map<string | undefined, [string, React.ReactNode][]>();
  for (const entry of suggestions) {
    const group = optionMap.get(entry[0])?.group;
    groups.set(group, [...(groups.get(group) ?? []), entry]);
  }
  return (
    <div
      data-react-toolbox="autocomplete"
      className={cn(
        'rt-autocomplete-autocomplete',
        'p-0 relative',
        materialRoot,
        materialDescendants,
        theme?.autocomplete,
        focus && cn('rt-autocomplete-focus', theme?.focus),
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
        required={required}
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
      <Input
        {...others}
        id={id}
        ref={input}
        disabled={disabled}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-required={required || undefined}
        aria-busy={loading || undefined}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={
          focus && active !== null && keys.indexOf(active) >= 0 ? `${id}-option-${keys.indexOf(active)}` : undefined
        }
        autoComplete="off"
        className={cn(
          'rt-autocomplete-input',
          'relative',
          "[&::after]:[border-left:var(--autocomplete-border-size)_solid_transparent] [&::after]:[border-right:var(--autocomplete-border-size)_solid_transparent] [&::after]:[border-top:var(--autocomplete-border-size)_solid_var(--input-chevron-color)] [&::after]:[content:''] [&::after]:h-0 [&::after]:pointer-events-none [&::after]:absolute [&::after]:right-(--input-chevron-offset) [&::after]:top-[50%] [&::after]:[transition:transform_var(--animation-duration)_var(--animation-curve-default)] [&::after]:w-0",
          '[&:focus-within:not(.rt-input-disabled)::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_87%)]',
          '[&.rt-input-disabled::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_38%)]',
          theme?.input,
        )}
        error={error || validationMessage}
        label={label}
        value={query}
        onBlur={(event) => {
          setFocus(false);
          if (!multiple && controlledQuery === undefined) {
            setQuery(selectedQuery);
            if (query !== selectedQuery) onQueryChange?.(selectedQuery);
          }
          onBlur?.(event, active);
        }}
        onChange={(text) => {
          if (disabled) return;
          const next = clearQuery.current ? '' : text;
          clearQuery.current = false;
          setQuery(next);
          setFocus(true);
          onQueryChange?.(next);
          setShowAll(next ? false : showSuggestionsWhenValueIsSet);
          setActive(null);
        }}
        onFocus={(event) => {
          onFocus?.(event);
          if (disabled || event.defaultPrevented) return;
          event.target.scrollTop = 0;
          setActive(null);
          setFocus(true);
          const client = root.current?.querySelector('[data-react-toolbox="input"]')?.getBoundingClientRect();
          setDirection(
            direction === 'auto'
              ? client && client.top > (window.innerHeight || document.documentElement.offsetHeight) / 2 + client.height
                ? 'up'
                : 'down'
              : direction,
          );
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || disabled || event.nativeEvent.isComposing) return;
          clearQuery.current =
            (event.key === 'Backspace' || event.which === 8) && showSuggestionsWhenValueIsSet && showAll;
          if ((event.key === 'Enter' || event.which === 13) && focus) {
            const target =
              active != null && enabledKeys.includes(active) ? active : allowCreate ? query : enabledKeys[0];
            if (target != null && (allowCreate ? target.length > 0 : suggestions.has(target))) {
              setActive(target);
              select(event, target);
            }
          } else if (event.key === 'Escape' || event.which === 27) {
            if (focus) {
              event.preventDefault();
              event.stopPropagation();
              setFocus(false);
            }
          } else if (event.key === 'Tab') setFocus(false);
          else if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.which === 40 || event.which === 38) {
            event.preventDefault();
            const down = event.key === 'ArrowDown' || event.which === 40;
            const current = active == null ? -1 : enabledKeys.indexOf(active);
            const next =
              current < 0
                ? down
                  ? 0
                  : enabledKeys.length - 1
                : (current + (down ? 1 : -1) + enabledKeys.length) % enabledKeys.length;
            setActive(enabledKeys[next] ?? null);
            setFocus(true);
          }
        }}
        onKeyUp={(event) => {
          onKeyUp?.(event);
        }}
      />
      <ul
        id={`${id}-listbox`}
        role="listbox"
        aria-label={typeof label === 'string' ? label : others['aria-label']}
        aria-hidden={!expanded}
        aria-busy={loading || undefined}
        style={!expanded ? { visibility: 'hidden' } : undefined}
        className={cn(
          'rt-autocomplete-suggestions',
          'bg-(--autocomplete-suggestions-background) [list-style:none] max-h-0 overflow-x-hidden overflow-y-auto p-0 absolute [transition-duration:var(--animation-duration)] [transition-property:max-height,box-shadow] [transition-timing-function:var(--animation-curve-default)] invisible w-full z-(--z-index-high)',
          '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
          '[&:not(.rt-autocomplete-up)]:mt-[calc(-1_*_var(--input-padding))]',
          '[.rt-autocomplete-autocomplete.rt-autocomplete-focus_&]:[box-shadow:var(--zdepth-shadow-1)] [.rt-autocomplete-autocomplete.rt-autocomplete-focus_&]:max-h-(--autocomplete-overflow-max-height) [.rt-autocomplete-autocomplete.rt-autocomplete-focus_&]:[-ms-overflow-style:none] [.rt-autocomplete-autocomplete.rt-autocomplete-focus_&]:visible',
          theme?.suggestions,
          resolvedDirection === 'up' && cn('rt-autocomplete-up', '[.rt-autocomplete-suggestions&]:bottom-0', theme?.up),
        )}
      >
        {status != null && (
          <li role="presentation" aria-hidden="true">
            <span className="block p-(--autocomplete-suggestion-padding)">{status}</span>
          </li>
        )}
        {[...groups].map(([group, entries], groupIndex) =>
          group ? (
            <li role="group" aria-labelledby={`${id}-group-${groupIndex}`} key={group}>
              <div
                id={`${id}-group-${groupIndex}`}
                className="text-(--rt-color-text-secondary) text-sm p-(--autocomplete-suggestion-padding)"
              >
                {group}
              </div>
              <ul role="presentation" className="list-none m-0 p-0">
                {entries.map(([key, text]) => renderSuggestion(key, text))}
              </ul>
            </li>
          ) : (
            entries.map(([key, text]) => renderSuggestion(key, text))
          ),
        )}
      </ul>
      <span role="status" className="sr-only">
        {focus ? status : null}
      </span>
      {clearable && stringValues.some(Boolean) && (
        <button
          type="button"
          disabled={disabled}
          aria-label={clearLabel}
          className="text-(--input-text-highlight-color) cursor-pointer bg-transparent border-0 p-(--unit)"
          onClick={(event) => {
            change([], event);
            input.current?.focus();
          }}
        >
          {clearLabel}
        </button>
      )}
      {selectedPosition === 'below' ? renderSelected() : null}
    </div>
  );
}
export default Autocomplete;
