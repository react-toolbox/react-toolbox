import apiData from 'react-toolbox/registry/api.json';
import ApiTable from './api-table';
import type { ApiProperty, FamilyApi } from './api-types';
import type { ComponentSlug } from './catalog';

const families: Record<string, FamilyApi> = apiData.families;

/** Curate behavior choices; full types, defaults, and inherited HTML props remain in the source. */
const keyProps: Record<ComponentSlug, Record<string, string[]>> = {
  accordion: {
    AccordionRoot: ['value', 'defaultValue', 'onValueChange', 'multiple', 'disabled'],
    AccordionItem: ['value', 'disabled'],
    AccordionPanel: ['keepMounted'],
  },
  'app-bar': { AppBar: ['fixed', 'flat', 'scrollHide', 'leftIconLabel', 'rightIconLabel'] },
  autocomplete: {
    Autocomplete: [
      'source',
      'multiple',
      'value',
      'defaultValue',
      'onChange',
      'allowCreate',
      'loading',
      'clearable',
      'readOnly',
    ],
  },
  avatar: { Avatar: ['image', 'alt', 'cover', 'fallbackDelay', 'onLoadingStatusChange'] },
  button: {
    Button: ['raised', 'floating', 'mini', 'primary', 'accent', 'asChild'],
    BrowseButton: ['accept', 'multiple', 'onChange'],
  },
  card: { Card: ['raised'], CardMedia: ['aspectRatio', 'contentOverlay', 'image', 'alt'] },
  checkbox: { Checkbox: ['label', 'indeterminate', 'onChange'] },
  chip: { Chip: ['deletable', 'deleteLabel', 'disabled', 'onDeleteClick'] },
  'date-picker': {
    DatePicker: [
      'value',
      'defaultValue',
      'onChange',
      'open',
      'defaultOpen',
      'onOpenChange',
      'minDate',
      'maxDate',
      'disabledDates',
      'autoOk',
      'locale',
      'clearable',
      'layout',
      'labels',
      'startYear',
      'endYear',
      'readOnly',
    ],
  },
  dialog: {
    Dialog: [
      'active',
      'title',
      'actions',
      'type',
      'onEscKeyDown',
      'onOverlayClick',
      'onOpenAutoFocus',
      'onCloseAutoFocus',
    ],
  },
  divider: { Divider: ['orientation', 'decorative'] },
  drawer: { Drawer: ['active', 'type', 'withOverlay', 'insideTree', 'onEscKeyDown', 'onOverlayClick'] },
  dropdown: {
    Dropdown: [
      'source',
      'value',
      'defaultValue',
      'onChange',
      'allowBlank',
      'template',
      'groupKey',
      'textKey',
      'readOnly',
    ],
  },
  'font-icon': { FontIcon: ['value', 'alt'] },
  input: { Input: ['label', 'hint', 'error', 'floating', 'multiline', 'onChange'] },
  list: { List: ['selectable', 'ripple'], ListItem: ['caption', 'legend', 'itemContent', 'disabled'] },
  menu: {
    IconMenu: ['trigger', 'open', 'defaultOpen', 'onOpenChange', 'position'],
    MenuItem: ['value', 'disabled', 'closeOnSelect', 'textValue'],
  },
  overlay: { Overlay: ['active', 'lockScroll', 'onEscKeyDown'] },
  'progress-bar': { ProgressBar: ['type', 'mode', 'value', 'min', 'max', 'buffer'] },
  radio: { RadioGroup: ['value', 'defaultValue', 'onChange', 'name', 'disabled', 'required'] },
  ripple: { useRipple: ['centered', 'disabled', 'multiple', 'spread'] },
  slider: { Slider: ['value', 'defaultValue', 'onChange', 'onValueCommit', 'min', 'max', 'step', 'pinned'] },
  sheet: {
    SheetRoot: [
      'open',
      'defaultOpen',
      'onOpenChange',
      'direction',
      'modal',
      'dismissible',
      'snapPoints',
      'activeSnapPoint',
      'setActiveSnapPoint',
      'container',
      'autoFocus',
    ],
    SheetHandle: ['preventCycle'],
  },
  snackbar: { Snackbar: ['active', 'label', 'action', 'onClick', 'timeout', 'onTimeout'] },
  switch: { Switch: ['label', 'onChange'] },
  table: {
    Table: ['selectionMode', 'selected', 'defaultSelected', 'onSelectionChange'],
    TableRow: ['value', 'selectionDisabled', 'onSelectionChange'],
    TableHead: ['displaySelect', 'onSelectionChange'],
    TableCell: ['numeric', 'sorted', 'tagName'],
  },
  tabs: {
    Tabs: ['value', 'defaultValue', 'onValueChange', 'activationMode', 'loop', 'hideMode', 'fixed'],
    Tab: ['value', 'label'],
    TabContent: ['value'],
  },
  'time-picker': {
    TimePicker: [
      'value',
      'defaultValue',
      'onChange',
      'format',
      'minTime',
      'maxTime',
      'minuteStep',
      'readOnly',
      'clearable',
      'layout',
      'labels',
      'open',
      'defaultOpen',
      'onOpenChange',
    ],
  },
  tooltip: { useTooltip: ['tooltip', 'tooltipDelay', 'tooltipPosition', 'tooltipHideOnClick', 'tooltipShowOnClick'] },
};

/** Sheet parts forward Vaul's props; the generated API records only the inherited type, so the curated props are described here. */
const inheritedProps: Record<string, ApiProperty[]> = {
  SheetRoot: [
    prop('open', 'boolean', 'Controlled visibility.'),
    prop('defaultOpen', 'boolean', 'Open on mount without the enter animation.', 'false'),
    prop('onOpenChange', '(open: boolean) => void', ''),
    prop('direction', "'top' | 'bottom' | 'left' | 'right'", 'Edge the sheet enters from.', "'bottom'"),
    prop('modal', 'boolean', 'Modal sheets trap focus and lock page scrolling.', 'true'),
    prop(
      'dismissible',
      'boolean',
      'Close on Escape, overlay interaction, or drag. With false, control open yourself.',
      'true',
    ),
    prop('snapPoints', '(number | string)[]', 'Viewport fractions or CSS lengths the sheet rests at.'),
    prop('activeSnapPoint', 'number | string | null', 'Controlled snap point; pair with setActiveSnapPoint.'),
    prop('setActiveSnapPoint', '(snapPoint: number | string | null) => void', ''),
    prop(
      'container',
      'HTMLElement | null',
      'Element that receives the portaled overlay and content. Defaults to document.body.',
    ),
    prop('autoFocus', 'boolean', 'Move focus into the sheet when it opens.', 'true'),
  ],
  SheetHandle: [prop('preventCycle', 'boolean', 'Keep a handle tap from cycling through snap points.', 'false')],
};
function prop(name: string, type: string, description: string, defaultValue: string | null = null): ApiProperty {
  return { name, type, required: false, description, callback: type.includes('=>'), default: defaultValue };
}

export default function ApiReference({ slug }: { slug: ComponentSlug }) {
  const family = families[slug];
  if (!family) throw new Error(`Missing API documentation for ${slug}`);
  return (
    <div className="space-y-6">
      <p className="text-toolbox-body/6 text-toolbox-text-secondary">
        Key props and defaults. Full types and inline documentation are included with the source in{' '}
        <code className="wrap-break-word">material/{slug}</code>.
      </p>
      {Object.entries(keyProps[slug]).map(([name, names]) => {
        const api = family.apis.find((item) => item.name === name);
        if (!api) throw new Error(`Missing documented part: ${name}`);
        const documented = inheritedProps[name] ?? api.properties;
        const properties = names.toSorted().map((propertyName) => {
          const property = documented.find((item) => item.name === propertyName);
          if (!property) throw new Error(`Missing documented prop: ${name}.${propertyName}`);
          return property;
        });
        return (
          <section key={name} aria-labelledby={`api-${name}`} className="space-y-4">
            <h3 id={`api-${name}`} className="scroll-mt-(--docs-appbar-height) text-toolbox-subheading">
              <code>{name}</code>
            </h3>
            <ApiTable name={name} properties={properties} />
          </section>
        );
      })}
    </div>
  );
}
