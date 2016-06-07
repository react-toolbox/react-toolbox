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
export interface Conditional {
	/**
	 * If true, component will be disabled
	 * @default false
	 */
	disabled?: boolean
}

/**
 * Properties of components that have values that can be changed (T is the type of the value)
 */
export interface Changeable<T> {
	/**
	 * Callback called when the picker value is changed.
	 * @param v Type of the value
	 */
	onChange?: (v: T) => void
}

export interface AutocompleteProps extends Props, Conditional, Changeable<string | Array<any>> {
	/**
	 * Sets the error string for the internal input element.
	 */
	error?: string,
	/**
	 * The text string to use for the floating label element.
	 */
	label?: string,
	/**
	 * If true, component can hold multiple values.
	 * @default true
	 */
	multiple?: boolean,
	/**
	 * 	Object of key/values or array representing all items suggested.
	 */
	source: Object | Array<any>,
	/**
	 * If true, the list of suggestions will not be filtered when a value is selected, until the query is modified.
	 * @default false
	 */
	showSuggestionsWhenValueIsSet?: boolean,
	/**
	 * Type of the input element. It can be a valid HTML5 input type
	 * @default text
	 */
	type?: string,
	/**
	 * 	Value or array of values currently selected component.Current value of the input element.
	 */
	value?: string | Array<any>,
}
/**
 * An input field with a set of predeterminated labeled values. When it's focused it shows a list of hints that are filtered by label as the user types. 
 * They can be simple or multiple depending on the amount of values that can be selected. 
 * The opening direction is determined at opening time depending on the current position.
 */
export default class Autocomplete extends React.Component<AutocompleteProps, {}> {
	render(): React.DOMElement<any, any>;
}