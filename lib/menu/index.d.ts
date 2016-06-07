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

export interface Iconic {
	/**
	 * Value of the icon (See icon component).
	 */
	icon?: string | __React.ReactElement<any> | __React.ReactHTMLElement<any>,
}
export interface MenuProps extends Props {
	/**
	 * If true, the menu will be displayed as opened by default.
	 * @default false
	 */
	active?: boolean,
	/**
	 * Callback that will be called when the menu is being hidden.
	 */
	onHide?: Function,
	/**
	 * Callback that will be called when the menu is being shown.
	 */
	onShow?: Function,
	/**
	 * If true the menu wrapper will show an outline with a soft shadow.
	 * @default true
	 */
	outline?: boolean,
	/**
	 * Determine the position of the menu. 
	 * With static value the menu will be always shown, auto means that the it will decide the opening direction based on the current position. 
	 * To force a position use top-left, top-right, bottom-left, bottom-right.
	 * @default static
	 */
	position?: string,
	/**
	 * If true, the menu items will show a ripple effect on click.
	 */
	ripple?: boolean,
	/**
	 * If true, the menu will keep a value to highlight the active child item.
	 */
	selectable?: boolean,
	/**
	 *  Used for selectable menus and indicates the initial value so the child item with this value can be highlighted.
	 */
	value?: boolean,
}
export class Menu extends React.Component<MenuProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface IconMenuProps extends Props, Iconic {
	/**
	 * If true, the icon will show a ripple when is clicked.
	 */
	iconRipple?: boolean,
	/**
	 * Transferred to the Menu component.
	 * @default true
	 */
	menuRipple?: boolean,
	/**
	 * Callback that will be called when the icon is clicked.
	 */
	onClick?: Function,
	/**
	 * Callback that will be called when the menu is being hidden.
	 */
	onHide?: Function, 
	/**
	 * Callback that will be called when the menu is being shown.
	 */
	onShow?: Function,
	/**
	 * Callback that will be called when a menu item is selected.
	 */
	onSelect?: Function,
	/**
	 * Determine the position of the menu. This property is transferred to the inner Menu component.
	 * @default auto
	 */
	position?: string,
	/**
	 * If true, the menu will keep a value to highlight the active child item. Transferred to the Menu
	 */
	selectable?: boolean,
}
export class IconMenu extends React.Component<IconMenuProps, {}> {
	render(): React.DOMElement<any, any>;
}
export interface MenuItemProps extends Props, Conditional, Iconic {
	/**
	 * The text to include in the menu item.
	 */
	caption?: string,
	/**
	 * If true, the item will show a ripple effect when it's clicked. Inherited from the parent.
	 */
	ripple?: boolean,
	/**
	 * Transferred from the Menu component for selectable menus. Indicates if it's the current active option.
	 */
	selected?: boolean,
}
export class MenuItem extends React.Component<MenuItemProps, {}> {
	render(): React.DOMElement<any, any>;
}
export class MenuDivider extends React.Component<any, {}> {
	render(): React.DOMElement<any, any>;
}