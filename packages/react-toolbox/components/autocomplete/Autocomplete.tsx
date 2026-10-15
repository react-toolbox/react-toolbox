'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { AutocompleteTheme } from './types';

import React, { useEffect, useId, useImperativeHandle, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import Chip, { type ChipEvent } from '../chip/Chip';
import Input, { type InputProps, type InputHandle, type InputElement } from '../input/Input';

export type { AutocompleteTheme } from './types';
export type AutocompleteValue = string | string[] | Record<string, React.ReactNode>;
export type AutocompleteSource =
  | Record<string, React.ReactNode>
  | readonly (string | readonly [string, React.ReactNode])[];
export type AutocompleteEvent = ChipEvent;
export interface AutocompleteBaseProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'theme' | 'multiple' | 'ref'> {
  allowCreate?: boolean;
  direction?: 'auto' | 'up' | 'down';
  keepFocusOnChange?: boolean;
  onBlur?: (event: React.FocusEvent<InputElement>, active?: string | null) => void;
  onQueryChange?: (query: string) => void;
  query?: string;
  selectedPosition?: 'above' | 'below' | 'none';
  showSelectedWhenNotInSource?: boolean;
  showSuggestionsWhenValueIsSet?: boolean;
  source?: AutocompleteSource;
  suggestionMatch?: 'disabled' | 'start' | 'anywhere' | 'word' | 'none';
  theme?: AutocompleteTheme;
  ref?: React.Ref<InputHandle>;
}
export interface AutocompleteSingleProps extends AutocompleteBaseProps {
  multiple: false;
  value?: string;
  onChange?: (value: string, event: AutocompleteEvent) => void;
}
export interface AutocompleteArrayProps extends AutocompleteBaseProps {
  multiple?: true;
  value?: string[];
  onChange?: (value: string[], event: AutocompleteEvent) => void;
}
export interface AutocompleteObjectProps extends AutocompleteBaseProps {
  multiple?: true;
  value: Record<string, React.ReactNode>;
  onChange?: (value: Record<string, React.ReactNode>, event: AutocompleteEvent) => void;
}
export type AutocompleteProps = AutocompleteSingleProps | AutocompleteArrayProps | AutocompleteObjectProps;
function hasObjectValue(props: AutocompleteArrayProps | AutocompleteObjectProps): props is AutocompleteObjectProps {
  return props.value != null && !Array.isArray(props.value);
}
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
    theme,
    value,
    id: suppliedId,
    ref,
    ...others
  } = props;
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
  const sourceMap = new Map<string, React.ReactNode>(
    Array.isArray(source)
      ? source.map((item) => (typeof item === 'string' ? [item, item] : [item[0], item[1]]))
      : Object.entries(source),
  );
  const queryFor = (next: AutocompleteValue | undefined) =>
    !multiple && next != null ? String(sourceMap.get(String(next)) ?? next) : '';
  const [query, setQuery] = useState(() => controlledQuery || queryFor(value));
  const [focus, setFocus] = useState(false);
  const [resolvedDirection, setDirection] = useState(direction);
  const [showAll, setShowAll] = useState(showSuggestionsWhenValueIsSet);
  const [active, setActive] = useState<string | null>(null);
  const clearQuery = useRef(false);
  const objectValue = value != null && typeof value === 'object' && !Array.isArray(value);
  const vals = multiple ? value : [value];
  const stringValues = (Array.isArray(vals) ? vals : vals && typeof vals === 'object' ? Object.keys(vals) : []).map(
    String,
  );
  const selected =
    showSelectedWhenNotInSource && objectValue
      ? new Map(Object.entries(value))
      : new Map([...sourceMap].filter(([key]) => stringValues.includes(key)));
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
    [...sourceMap].filter(([key, candidate]) =>
      multiple ? !selected.has(key) && matches(candidate) : !query || showAll || matches(candidate),
    ),
  );
  const keys = [...suggestions.keys()];
  useEffect(() => {
    if (disabled) setFocus(false);
  }, [disabled]);
  useEffect(() => {
    if (!multiple) setQuery(controlledQuery || queryFor(value));
  }, [controlledQuery, value, multiple, source]);
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
      const next = Array.isArray(values) ? values[0] : Object.keys(values)[0];
      if (next === undefined) return;
      nextQuery = queryFor(next);
      props.onChange?.(next, event);
    } else if (hasObjectValue(props)) {
      const next = Array.isArray(values)
        ? Object.fromEntries(values.map((key) => [key, sourceMap.get(key) ?? key]))
        : values;
      props.onChange?.(next, event);
    } else {
      props.onChange?.(Array.isArray(values) ? values : Object.keys(values), event);
    }
    setQuery(nextQuery);
    setShowAll(showSuggestionsWhenValueIsSet);
    if (!keepFocusOnChange) {
      setFocus(false);
      input.current?.blur();
    }
    if (controlledQuery) onQueryChange?.(nextQuery);
  };
  const select = (event: AutocompleteEvent, target: string) => {
    if (disabled) return;
    event.preventDefault();
    event.stopPropagation();
    if (objectValue) change({ ...Object.fromEntries(selected), [target]: sourceMap.get(target) ?? target }, event);
    else change([target, ...selected.keys()], event);
  };
  const renderSelected = () =>
    multiple ? (
      <ul
        className={cn(
          'rt-autocomplete-values',
          'flex-row [flex-wrap:wrap] [list-style:none] m-0 p-[0_0_calc(var(--unit)_/_2)_0]',
          theme?.values,
        )}
      >
        {[...selected].map(([key, text]) => (
          <Chip
            key={key}
            className={cn(
              'rt-autocomplete-value',
              'm-[var(--autocomplete-value-margin)] mr-[var(--chip-margin-right)]',
              theme?.value,
            )}
            deletable
            disabled={disabled}
            deleteLabel={typeof text === 'string' ? `Remove ${text}` : 'Remove'}
            onDeleteClick={(event) => {
              const remaining = new Map(selected);
              remaining.delete(key);
              change(objectValue ? Object.fromEntries(remaining) : [...remaining.keys()], event);
            }}
          >
            {text}
          </Chip>
        ))}
      </ul>
    ) : null;
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
      {selectedPosition === 'above' ? renderSelected() : null}
      <Input
        {...others}
        id={id}
        ref={input}
        disabled={disabled}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={focus && suggestions.size > 0}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={
          focus && active !== null && keys.indexOf(active) >= 0 ? `${id}-option-${keys.indexOf(active)}` : undefined
        }
        autoComplete="off"
        className={cn(
          'rt-autocomplete-input',
          'relative',
          "[&::after]:[border-left:var(--autocomplete-border-size)_solid_transparent] [&::after]:[border-right:var(--autocomplete-border-size)_solid_transparent] [&::after]:[border-top:var(--autocomplete-border-size)_solid_var(--input-chevron-color)] [&::after]:[content:''] [&::after]:h-0 [&::after]:pointer-events-none [&::after]:absolute [&::after]:right-[var(--input-chevron-offset)] [&::after]:top-[50%] [&::after]:[transition:transform_var(--animation-duration)_var(--animation-curve-default)] [&::after]:w-0",
          '[&:focus-within:not(.rt-input-disabled)::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_87%)]',
          '[&.rt-input-disabled::after]:[border-top-color:rgb(from_var(--rt-color-black)_r_g_b_/_38%)]',
          theme?.input,
        )}
        error={error}
        label={label}
        value={query}
        onBlur={(event) => {
          setFocus(false);
          onBlur?.(event, active);
        }}
        onChange={(text) => {
          if (disabled) return;
          const next = clearQuery.current ? '' : text;
          clearQuery.current = false;
          setQuery(next);
          onQueryChange?.(next);
          setShowAll(next ? false : showSuggestionsWhenValueIsSet);
          setActive(null);
        }}
        onFocus={(event) => {
          if (disabled) return;
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
          onFocus?.(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || disabled || event.nativeEvent.isComposing) return;
          clearQuery.current =
            (event.key === 'Backspace' || event.which === 8) && showSuggestionsWhenValueIsSet && showAll;
          if ((event.key === 'Enter' || event.which === 13) && focus) {
            const target = active != null && suggestions.has(active) ? active : allowCreate ? query : keys[0];
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
            const current = active == null ? -1 : keys.indexOf(active);
            const next =
              current < 0 ? (down ? 0 : keys.length - 1) : (current + (down ? 1 : -1) + keys.length) % keys.length;
            setActive(keys[next] ?? null);
            setFocus(true);
          }
        }}
        onKeyUp={(event) => {
          if (event.which === 27) input.current?.blur();
          onKeyUp?.(event);
        }}
      />
      <ul
        id={`${id}-listbox`}
        role="listbox"
        aria-label={typeof label === 'string' ? label : others['aria-label']}
        aria-hidden={!focus}
        className={cn(
          'rt-autocomplete-suggestions',
          'bg-[var(--autocomplete-suggestions-background)] [list-style:none] max-h-0 overflow-x-hidden overflow-y-auto p-0 absolute [transition-duration:var(--animation-duration)] [transition-property:max-height,_box-shadow] [transition-timing-function:var(--animation-curve-default)] [visibility:hidden] w-full z-[var(--z-index-high)]',
          '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
          '[&:not(.rt-autocomplete-up)]:mt-[calc(-1_*_var(--input-padding))]',
          '[.rt-autocomplete-autocomplete.rt-autocomplete-focus_&]:[box-shadow:var(--zdepth-shadow-1)] [.rt-autocomplete-autocomplete.rt-autocomplete-focus_&]:max-h-[var(--autocomplete-overflow-max-height)] [.rt-autocomplete-autocomplete.rt-autocomplete-focus_&]:[-ms-overflow-style:none] [.rt-autocomplete-autocomplete.rt-autocomplete-focus_&]:[visibility:visible]',
          theme?.suggestions,
          resolvedDirection === 'up' && cn('rt-autocomplete-up', '[.rt-autocomplete-suggestions&]:bottom-0', theme?.up),
        )}
      >
        {[...suggestions].map(([key, text], index) => (
          <li
            id={`${id}-option-${index}`}
            key={key}
            role="option"
            aria-selected={active === key}
            className={cn(
              'rt-autocomplete-suggestion',
              'cursor-pointer text-[length:var(--input-field-font-size)] p-[var(--autocomplete-suggestion-padding)]',
              theme?.suggestion,
              active === key &&
                cn(
                  'rt-autocomplete-active',
                  '[.rt-autocomplete-suggestion&]:bg-[var(--autocomplete-suggestion-active-background)]',
                  theme?.active,
                ),
            )}
            onMouseDown={(event) => select(event, key)}
            onMouseOver={() => setActive(key)}
          >
            {text}
          </li>
        ))}
      </ul>
      {selectedPosition === 'below' ? renderSelected() : null}
    </div>
  );
}
export default Autocomplete;
