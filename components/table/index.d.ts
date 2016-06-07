import * as React from 'react';
export interface Props {
	/**
	 * Sets a CSS class on the component.
	 */
	className?: string,
	id?: string;
	/**
	 * A key used to uniquely identify the element within an Array
	 */
	key?: string,
	/**
	 * Inline style
	 */
	style?: any,
	/**
	 * Tooltip text
	 * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
	 * @see http://react-toolbox.com/#/components/tooltip
	 */
	tooltip?: string,
	/**
	 * Amount of time in miliseconds spent before the tooltip is visible.
	 * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
	 * @see http://react-toolbox.com/#/components/tooltip
	 */
	tooltipDelay?: number,
	/**
	 * If true, the Tooltip hides after a click in the host component.
	 * APPLIES ONLY IF THE COMPONENT IS WRAPPED WITH Tooltip.
	 * @default true
	 * @see http://react-toolbox.com/#/components/tooltip
	 */
	tooltipHideOnClick?: boolean,
}
export interface TableProps extends Props {
	/**
	 * If true, component will show a heading using model field names.
	 */
	heading?: boolean,
	/**
	 * Object describing the data model that represents each object in the source.
	 */
	model?: { [key: string]: string },
	/**
	 * Callback function that is fired when an item in a row changes. If set, rows are editable.
	 */
	onChange?: Function,
	/**
	 * Callback function invoked when the row selection changes.
	 */
	onSelect?: Function,
	/**
	 * Array of indexes of the items in the source that should appear as selected.
	 */
	selected?: Array<number>,
	/**
	 * Array of objects representing each item to show.
	 */
	source?: Array<{ [key: string]: any }>,
}
export default class Table extends React.Component<TableProps, {}> {
	render(): React.DOMElement<any, any>;
}