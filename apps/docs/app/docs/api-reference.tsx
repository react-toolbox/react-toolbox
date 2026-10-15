import apiData from 'react-toolbox/registry/api.json';
import ApiTable from './api-table';
import type { FamilyApi } from './api-types';
import type { ComponentSlug } from './catalog';

const families: Record<string, FamilyApi> = apiData.families;

// Curate what readers need to choose behavior. Types and defaults still come
// from the source; inherited HTML props and compatibility APIs stay in the editor.
const keyProps: Record<ComponentSlug, Record<string, string[]>> = {
  'app-bar': { AppBar: ['fixed', 'flat', 'scrollHide', 'leftIconLabel', 'rightIconLabel'] },
  autocomplete: {
    Autocomplete: ['source', 'multiple', 'value', 'defaultValue', 'onChange', 'allowCreate', 'loading', 'clearable'],
  },
  avatar: { Avatar: ['image', 'alt', 'cover', 'fallbackDelay', 'onLoadingStatusChange'] },
  button: {
    Button: ['raised', 'flat', 'floating', 'mini', 'primary', 'accent', 'asChild'],
    BrowseButton: ['accept', 'multiple', 'onChange'],
  },
  card: { Card: ['raised'], CardMedia: ['aspectRatio', 'contentOverlay', 'image', 'alt'] },
  checkbox: { Checkbox: ['label', 'indeterminate', 'onChange'] },
  chip: { Chip: ['deletable', 'deleteLabel', 'disabled', 'onDeleteClick'] },
  'date-picker': {
    DatePicker: ['value', 'defaultValue', 'onChange', 'minDate', 'maxDate', 'disabledDates', 'autoOk', 'locale'],
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
  drawer: { Drawer: ['active', 'type', 'withOverlay', 'insideTree', 'onEscKeyDown', 'onOverlayClick'] },
  dropdown: {
    Dropdown: ['source', 'value', 'defaultValue', 'onChange', 'allowBlank', 'template', 'groupKey', 'textKey'],
  },
  'font-icon': { FontIcon: ['value', 'alt'] },
  input: { Input: ['label', 'hint', 'error', 'floating', 'multiline', 'onChange'] },
  layout: { NavDrawer: ['active', 'pinned', 'permanentAt', 'clipped'], Panel: ['bodyScroll'] },
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
  snackbar: { Snackbar: ['active', 'label', 'action', 'onClick', 'timeout', 'onTimeout'] },
  switch: { Switch: ['label', 'onChange'] },
  table: {
    Table: ['selectable', 'multiSelectable', 'onRowSelect'],
    TableRow: ['selected'],
    TableCell: ['numeric', 'sorted', 'tagName'],
  },
  tabs: { Tabs: ['index', 'defaultIndex', 'onChange', 'activationMode', 'loop', 'hideMode', 'fixed'] },
  'time-picker': { TimePicker: ['value', 'defaultValue', 'onChange', 'format', 'open', 'onOpenChange'] },
  tooltip: { useTooltip: ['tooltip', 'tooltipDelay', 'tooltipPosition', 'tooltipHideOnClick', 'tooltipShowOnClick'] },
};

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
        const properties = names.map((propertyName) => {
          const property = api?.properties.find((item) => item.name === propertyName);
          if (!property) throw new Error(`Missing documented prop: ${name}.${propertyName}`);
          return property;
        });
        return (
          <section key={name} aria-labelledby={`api-${name}`} className="space-y-4">
            <h3 id={`api-${name}`} className="scroll-mt-24 text-toolbox-subheading">
              <code>{name}</code>
            </h3>
            <ApiTable name={name} properties={properties} />
          </section>
        );
      })}
    </div>
  );
}
