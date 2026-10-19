import React from 'react';
import {
  Input,
  Checkbox,
  RadioButton,
  RadioGroup,
  Switch,
  Chip,
  DatePicker,
  TimePicker,
  Autocomplete,
  Dropdown,
  type InputHandle,
  type CheckboxHandle,
  type RadioButtonHandle,
  type SwitchHandle,
} from '../../src';

const input = React.createRef<InputHandle>();
const checkbox = React.createRef<CheckboxHandle>();
const radio = React.createRef<RadioButtonHandle>();
const toggle = React.createRef<SwitchHandle>();
export const controls = (
  <>
    <Input
      ref={input}
      multiline
      rows={3}
      onChange={(value, event) => {
        value.toUpperCase();
        event.currentTarget.value.toUpperCase();
      }}
    />
    <Checkbox
      ref={checkbox}
      onChange={(checked, event) => {
        checked.valueOf();
        event.currentTarget.checked.valueOf();
      }}
    />
    <RadioGroup
      value="a"
      onChange={(value, event) => {
        value?.toUpperCase();
        event.currentTarget.focus();
      }}
    >
      <RadioButton ref={radio} value="a" />
    </RadioGroup>
    <Switch ref={toggle} onChange={(checked) => checked.valueOf()} />
    <Chip deletable onDeleteClick={(event) => event.preventDefault()}>
      Tag
    </Chip>
    <DatePicker
      value={new Date()}
      locale={{ months: ['January'] }}
      onChange={(date) => date.getFullYear()}
    />
    <TimePicker format="ampm" value={new Date()} onChange={(date) => date.getHours()} />
    <Autocomplete
      multiple={false}
      value="a"
      source={{ a: 'Alpha' }}
      onChange={(value) => value.toUpperCase()}
    />
    <Autocomplete
      value={['a']}
      source={['a', 'b']}
      onChange={(values) => values.map((value) => value.toUpperCase())}
    />
    <Dropdown
      source={[{ code: 'a', title: 'Alpha' }]}
      valueKey="code"
      labelKey="title"
      template={(item) => item.title}
      onChange={(value) => String(value)}
    />
  </>
);
// @ts-expect-error The native value-first input API is textual.
const wrongInput = <Input onChange={(value: number) => value} />;
// @ts-expect-error Date pickers produce Date instances.
const wrongDate = <DatePicker onChange={(value: string) => value} />;
// @ts-expect-error Date values carry calendar semantics; formatting belongs to inputFormat.
const wrongDateValue = <DatePicker value="15/10/2026" />;

// Omitting value must not erase the single-select discriminant.
const singleAutocomplete = (
  <Autocomplete multiple={false} onChange={(value) => value.toUpperCase()} />
);
const multipleAutocomplete = (
  <Autocomplete onChange={(values) => values.map((value) => value.toUpperCase())} />
);
const objectAutocomplete = (
  <Autocomplete
    value={{ a: 'Alpha' }}
    onChange={(values) => {
      const label: React.ReactNode = values.a;
      return label;
    }}
  />
);
const wrongSingleCallback = (
  // @ts-expect-error Single-select callbacks receive strings even without a controlled value.
  <Autocomplete multiple={false} onChange={(value) => value.map(String)} />
);
// @ts-expect-error Single-select values cannot be arrays.
const wrongSingleValue = <Autocomplete multiple={false} value={['a']} />;
// @ts-expect-error Multiple-select values cannot be strings.
const wrongMultipleValue = <Autocomplete value="a" />;

const derivedAutocompleteProps: React.ComponentProps<typeof Autocomplete> = {
  multiple: false,
  onChange: (value) => value.toUpperCase(),
};
