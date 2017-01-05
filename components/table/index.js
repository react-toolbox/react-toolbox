import { themr } from 'react-css-themr';
import { TABLE } from '../identifiers.js';
import { Checkbox } from '../checkbox';
import { FontIcon } from '../font_icon';
import { tableFactory } from './Table.js';
import tableHeadFactory from './TableHead.js';
import tableRowFactory from './TableRow.js';
import theme from './theme.scss';

const applyTheme = (Component) => themr(TABLE, theme)(Component);
const ThemedTableHead = applyTheme(tableHeadFactory(Checkbox, FontIcon));
const ThemedTableRow = applyTheme(tableRowFactory(Checkbox));
const ThemedTable = applyTheme(tableFactory(ThemedTableHead, ThemedTableRow));

export default ThemedTable;
export { ThemedTable as Table };
