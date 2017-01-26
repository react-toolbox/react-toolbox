import { themr } from 'react-css-themr';
import { LIST } from '../identifiers';
import { Avatar } from '../avatar';
import { Checkbox } from '../checkbox';
import { ListItemText } from './ListItemText';
import { ListItemAction } from './ListItemAction';
import { ListSubHeader } from './ListSubHeader';
import { ListDivider } from './ListDivider';
import { listFactory } from './List';
import { listItemFactory } from './ListItem';
import { listCheckboxFactory } from './ListCheckbox';
import { listItemActionsFactory } from './ListItemActions';
import { listItemContentFactory } from './ListItemContent';
import { listItemLayoutFactory } from './ListItemLayout';
import themedRippleFactory from '../ripple';
import theme from './theme.css';

const applyTheme = Component => themr(LIST, theme)(Component);
const ripple = themedRippleFactory({ centered: false, listItemIgnore: true });
const ThemedListItemAction = applyTheme(ListItemAction);
const ThemedListSubHeader = applyTheme(ListSubHeader);
const ThemedListItemText = applyTheme(ListItemText);
const ThemedListDivider = applyTheme(ListDivider);
const ThemedListItemContent = applyTheme(listItemContentFactory(ThemedListItemText));
const ThemedListItemActions = applyTheme(listItemActionsFactory(ThemedListItemAction));
const ThemedListItemLayout = applyTheme(
  listItemLayoutFactory(Avatar, ThemedListItemContent, ThemedListItemActions),
);
const ThemedListCheckbox = applyTheme(listCheckboxFactory(Checkbox, ThemedListItemContent));
const ThemedListItem = applyTheme(
  listItemFactory(ripple, ThemedListItemLayout, ThemedListItemContent),
);
const ThemedList = applyTheme(listFactory(ThemedListItem));

export { ThemedListItemActions as ListItemActions };
export { ThemedListItemContent as ListItemContent };
export { ThemedListItemLayout as ListItemLayout };
export { ThemedListSubHeader as ListSubHeader };
export { ThemedListItemText as ListItemText };
export { ThemedListCheckbox as ListCheckbox };
export { ThemedListDivider as ListDivider };
export { ThemedListItem as ListItem };
export { ThemedList as List };
