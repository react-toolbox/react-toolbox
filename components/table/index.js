import { themr } from 'react-css-themr';
import { TABLE } from '../identifiers';
import { Checkbox } from '../checkbox';
import { FontIcon } from '../font_icon';

import { tableFactory } from './Table';
import { tableHeadFactory } from './TableHead';
import { tableRowFactory } from './TableRow';
import { tableCellFactory } from './TableCell';
import theme from './theme.css';

const applyTheme = Component => themr(TABLE, theme)(Component);
const ThemedTableCell = applyTheme(tableCellFactory(FontIcon));
const ThemedTableHead = applyTheme(tableHeadFactory(Checkbox, ThemedTableCell));
const ThemedTableRow = applyTheme(tableRowFactory(Checkbox, ThemedTableCell));
const ThemedTable = applyTheme(tableFactory(ThemedTableHead, ThemedTableRow));

export default ThemedTable;
export { ThemedTable as Table };
export { ThemedTableHead as TableHead };
export { ThemedTableRow as TableRow };
export { ThemedTableCell as TableCell };
